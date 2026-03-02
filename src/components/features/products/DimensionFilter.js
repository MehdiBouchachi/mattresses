"use client";

import { useMemo, useEffect } from "react";
import { products } from "@/constants/products";

export default function DimensionFilter({ state, dispatch, translation }) {
  const {
    dimension: sizeLabel,
    thickness: thicknessLabel,
    all: allLabel,
  } = translation;

  const isArabic = translation.locale === "ar";
  const cmLabel = isArabic ? "سم" : "cm";

  /* ================= ALL SIZES ================= */

  const sizes = useMemo(() => {
    const allSizes = products.flatMap(
      (p) => p.details?.dimensions?.map((d) => d.size) || [],
    );

    return [...new Set(allSizes)].sort((a, b) => {
      const aWidth = Number(a.split(" x ")[0]);
      const bWidth = Number(b.split(" x ")[0]);
      return aWidth - bWidth;
    });
  }, []);

  /* ================= ALL THICKNESS ================= */

  const thicknesses = useMemo(() => {
    const all = products.flatMap(
      (p) =>
        p.details?.dimensions?.flatMap((d) =>
          d.options?.map((o) => o.thickness),
        ) || [],
    );

    return [...new Set(all)].sort((a, b) => a - b);
  }, []);

  /* =========================================================
     AUTO SELECT THICKNESS WHEN SIZE SELECTED
  ========================================================== */

  useEffect(() => {
    if (state.size && state.thickness === null) {
      const validThickness = products.flatMap(
        (p) =>
          p.details?.dimensions
            ?.filter((d) => d.size === state.size)
            ?.flatMap((d) => d.options?.map((o) => o.thickness)) || [],
      );

      const unique = [...new Set(validThickness)].sort((a, b) => a - b);

      if (unique.length > 0) {
        dispatch({
          type: "SET_THICKNESS",
          payload: unique[0], // smallest valid
        });
      }
    }
  }, [state.size]);

  /* =========================================================
     AUTO SELECT SIZE WHEN THICKNESS SELECTED
  ========================================================== */

  useEffect(() => {
    if (!state.size && state.thickness !== null) {
      const validSizes = products.flatMap(
        (p) =>
          p.details?.dimensions
            ?.filter((d) =>
              d.options?.some((o) => o.thickness === state.thickness),
            )
            ?.map((d) => d.size) || [],
      );

      const unique = [...new Set(validSizes)].sort((a, b) => {
        const aWidth = Number(a.split(" x ")[0]);
        const bWidth = Number(b.split(" x ")[0]);
        return aWidth - bWidth;
      });

      if (unique.length > 0) {
        dispatch({
          type: "SET_SIZE",
          payload: unique[0], // smallest valid size
        });
      }
    }
  }, [state.thickness]);

  return (
    <div className="mt-6 sm:mt-8 lg:mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* SIZE */}
        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
            <h3 className="text-xs sm:text-sm">{sizeLabel}</h3>
          </label>

          <select
            dir="ltr"
            value={state.size}
            onChange={(e) =>
              dispatch({ type: "SET_SIZE", payload: e.target.value })
            }
            className="w-full border border-blue-100 rounded-xl px-4 py-3 text-sm bg-white text-slate-700 focus:border-blue-800 focus:ring-1 focus:ring-blue-800 outline-none transition"
          >
            <option value="">{allLabel}</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size} {cmLabel}
              </option>
            ))}
          </select>
        </div>

        {/* THICKNESS */}
        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
            <h3 className="text-xs sm:text-sm">{thicknessLabel}</h3>
          </label>

          <select
            dir="ltr"
            value={state.thickness ?? ""}
            onChange={(e) =>
              dispatch({
                type: "SET_THICKNESS",
                payload: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="w-full border border-blue-100 rounded-xl px-4 py-3 text-sm bg-white text-slate-700 focus:border-blue-800 focus:ring-1 focus:ring-blue-800 outline-none transition"
          >
            <option value="">{allLabel}</option>
            {thicknesses.map((thick) => (
              <option key={thick} value={thick}>
                {thick} {cmLabel}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
