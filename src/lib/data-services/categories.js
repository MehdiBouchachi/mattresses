import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────

export async function getMainCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, value, translations")
    .eq("type", "main")
    .order("id", { ascending: true });

  if (error) {
    console.error("[getMainCategories]", error);
    throw new Error("Main categories could not be loaded");
  }

  if (!data) return [];

  return data.map((cat) => ({
    id: cat.id,
    value: cat.value,
    translations: cat.translations,
  }));
}

export async function getAllCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, value, translations, type, parent_id")
    .order("id", { ascending: true });

  if (error) {
    console.error("[getAllCategories]", error);
    throw new Error("Categories could not be loaded");
  }

  if (!data) return [];

  return data.map((cat) => ({
    id: cat.id,
    value: cat.value,
    translations: cat.translations,
    type: cat.type,
    parent_id: cat.parent_id,
  }));
}
