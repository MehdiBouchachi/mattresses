// lib/data-services/products.js

import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────
// SHARED HELPERS (DRY)
// ─────────────────────────────────────────────

function baseProductQuery() {
  return supabase.from("products").select(`
    id,
    slug,
    name,
    description,
    available,
    featured,
    discount,
    category:categories!category_id (
      id,
      value,
      translations,
      type
    ),
    subcategory:categories!subcategory_id (
      id,
      value,
      translations,
      type
    ),
    images:product_images (
      id,
      url
    ),
    variants:product_variants (
      id,
      price,
      dimension:dimensions!dimension_id (
        id,
        label
      ),
      thickness:thicknesses!thickness_id (
        id,
        value
      )
    ),
    specs:product_specs (
      id,
      label,
      value
    ),
    features:product_features (
      id,
      translations
    )
  `);
}

function applyFilters(query, filters = {}) {
  const { category, subcategory, featured, available } = filters;

  if (category) {
    query = query.eq("category_id", category);
  }
  if (subcategory) {
    query = query.eq("subcategory_id", subcategory);
  }
  if (typeof featured === "boolean") {
    query = query.eq("featured", featured);
  }
  if (typeof available === "boolean") {
    query = query.eq("available", available);
  }

  return query;
}

function calcMinPrice(variants = []) {
  if (variants.length === 0) return 0;
  return Math.min(...variants.map((v) => Number(v.price)));
}

function getSpecValue(specs = [], label) {
  const spec = specs.find((s) => s.label.toLowerCase() === label.toLowerCase());
  return spec ? spec.value : null;
}

function groupVariantsByDimension(variants = []) {
  const map = new Map();

  for (const v of variants) {
    const size = v.dimension?.label ?? "Unknown";
    const dimensionId = v.dimension?.id;

    if (!map.has(size)) {
      map.set(size, { dimensionId, size, options: [] });
    }

    map.get(size).options.push({
      variantId: v.id,
      thickness: v.thickness?.value ?? null,
      price: Number(v.price),
    });
  }

  for (const group of map.values()) {
    group.options.sort((a, b) => (a.thickness ?? 0) - (b.thickness ?? 0));
  }

  return Array.from(map.values());
}

function buildFullProduct(product) {
  const {
    id,
    slug,
    name,
    description,
    category,
    subcategory,
    images,
    featured,
    available,
    discount,
    variants,
    specs,
    features,
  } = product;

  const firmness = getSpecValue(specs, "Firmness");
  const thickness = getSpecValue(specs, "Thickness");

  const technicalSpecs = specs.map((s) => ({
    label: s.label,
    value: s.value,
  }));

  const advantages = features.map((f) => ({
    id: f.id,
    translations: f.translations,
  }));

  return {
    id,
    slug,
    name,
    description,
    category: category
      ? {
          id: category.id,
          value: category.value,
          translations: category.translations,
          type: category.type,
        }
      : null,
    subcategory: subcategory
      ? {
          id: subcategory.id,
          value: subcategory.value,
          translations: subcategory.translations,
          type: subcategory.type,
        }
      : null,
    images: images.map((img) => img.url),
    featured,
    available,
    discount: Number(discount),
    minPrice: calcMinPrice(variants),
    details: {
      thickness,
      firmness,
      dimensions: groupVariantsByDimension(variants),
      technicalSpecs,
      advantages,
    },
  };
}

// ─────────────────────────────────────────────
// EXPORTED SERVICE FUNCTIONS
// ─────────────────────────────────────────────

export async function getProducts(filters = {}) {
  let query = baseProductQuery();
  query = applyFilters(query, filters);
  query = query.order("id", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  if (!data) return [];

  return data.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    images: product.images.map((img) => img.url),
    category: product.category
      ? {
          id: product.category.id,
          value: product.category.value,
          translations: product.category.translations,
          type: product.category.type,
        }
      : null,
    subcategory: product.subcategory
      ? {
          id: product.subcategory.id,
          value: product.subcategory.value,
          translations: product.subcategory.translations,
          type: product.subcategory.type,
        }
      : null,
    featured: product.featured,
    available: product.available,
    discount: Number(product.discount),
    minPrice: calcMinPrice(product.variants),
  }));
}

export async function getProductBySlug(slug) {
  const { data, error } = await baseProductQuery().eq("slug", slug).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  if (!data) return null;

  return flattenProduct(buildFullProduct(data));
}
/**
 * Fetch all products with FULL details (dimensions, options, specs).
 *
 * Used by: /mattresses page (needs details for advanced filtering)
 *
 * Returns the same shape as getProductBySlug but for all products.
 * Category/subcategory returned as flat strings for filtering & rendering.
 */
export async function getProductsWithDetails(filters = {}) {
  let query = baseProductQuery();
  query = applyFilters(query, filters);
  query = query.order("id", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  if (!data) return [];

  return data.map((product) => flattenProduct(buildFullProduct(product)));
}
/**
 * Flatten category/subcategory objects to strings.
 * Reused by any page that renders product data directly.
 */
function flattenProduct(product) {
  return {
    ...product,
    category: product.category?.value ?? null,
    categoryTranslations: product.category?.translations ?? null,
    subcategory: product.subcategory?.value ?? null,
    subcategoryTranslations: product.subcategory?.translations ?? null,
  };
}
