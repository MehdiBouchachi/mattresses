"use client";

import Filters from "@/components/features/products/Filters";
import ProductGrid from "@/components/features/products/ProductGrid";
import Pagination from "@/components/features/products/Pagination";
import Breadcrumb from "@/components/ui/Breadcrumb";

import { filterProducts } from "@/lib/filterProducts";

const ITEMS_PER_PAGE = 6;

/* ======================================================
   MAIN PAGE
====================================================== */

export default function MattressesClient({
  locale,
  translation,
  searchParams,
  products,
  categories,
  dimensions,
  thicknesses,
}) {
  /* ================= URL FILTERS ================= */

  const filters = {
    category: searchParams?.category || "all",
    subcategory: searchParams?.subcategory || "all",
    minPrice: searchParams?.min ? Number(searchParams.min) : 0,
    maxPrice: searchParams?.max ? Number(searchParams.max) : Infinity,
    size: searchParams?.size || "",
    thickness: searchParams?.thickness ? Number(searchParams.thickness) : null,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  };

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts = filterProducts(products, filters);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (filters.page - 1) * ITEMS_PER_PAGE,
    filters.page * ITEMS_PER_PAGE,
  );

  const {
    mattressesPage: {
      breadcrumbHome,
      breadcrumbCurrent,
      title,
      description,
      showing,
      products: productsLabel,
      filters: filtersTranslation,
    },
    home: {
      products: { productCard: productCardTranslation },
    },
  } = translation;

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        locale={locale}
        title={title}
        description={description}
        breadcrumbItems={[
          { label: breadcrumbHome, href: `/${locale}` },
          { label: breadcrumbCurrent },
        ]}
      />

      {/* FILTERS */}
      <Filters
        locale={locale}
        filtersTranslation={filtersTranslation}
        categories={categories}
        dimensions={dimensions}
        thicknesses={thicknesses}
      />

      {/* PRODUCTS */}
      <section className="py-8 sm:py-10 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-6 sm:mb-8 text-xs sm:text-sm text-slate-500">
            {showing} {paginatedProducts.length} {productsLabel}
          </div>

          <ProductGrid
            products={paginatedProducts}
            productCardTranslation={productCardTranslation}
            locale={locale}
          />

          <div className="mt-10 sm:mt-14 lg:mt-16">
            <Pagination totalPages={totalPages} page={filters.page} />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ======================================================
   PAGE HEADER
====================================================== */

function PageHeader({ locale, title, description, breadcrumbItems }) {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-24 sm:pt-28 lg:pt-36 pb-10 sm:pb-14 lg:pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-tight mb-4 sm:mb-6 text-blue-950">
        {title}
      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl">
        {description}
      </p>
    </section>
  );
}
