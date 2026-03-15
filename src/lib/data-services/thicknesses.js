import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────
// THICKNESSES
// ─────────────────────────────────────────────

export async function getAllThicknesses() {
  const { data, error } = await supabase
    .from("thicknesses")
    .select("id, value")
    .order("value", { ascending: true });

  if (error) {
    console.error("[getAllThicknesses]", error);
    throw new Error("Thicknesses could not be loaded");
  }

  if (!data) return [];

  return data.map((t) => ({
    id: t.id,
    value: t.value,
  }));
}
