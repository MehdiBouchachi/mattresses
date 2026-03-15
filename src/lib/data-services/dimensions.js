import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────
// DIMENSIONS
// ─────────────────────────────────────────────

export async function getAllDimensions() {
  const { data, error } = await supabase
    .from("dimensions")
    .select("id, label")
    .order("id", { ascending: true });

  if (error) {
    console.error("[getAllDimensions]", error);
    throw new Error("Dimensions could not be loaded");
  }

  if (!data) return [];

  return data.map((d) => ({
    id: d.id,
    label: d.label,
  }));
}
