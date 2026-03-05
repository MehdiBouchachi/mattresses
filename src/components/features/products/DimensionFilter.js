"use client";

import { useMemo } from "react";
import { products } from "@/constants/products";

export default function DimensionFilter({
  translation,
  searchParams,
  setParam,
}) {
  const {
    dimension: sizeLabel,
    thickness: thicknessLabel,
    all: allLabel,
  } = translation;

  const selectedSize = searchParams.get("size") || "";
  const selectedThickness = searchParams.get("thickness") || "";

  /* ================= SIZES ================= */

  const sizes = useMemo(() => {
    const allSizes = products.flatMap(
      (p) => p.details?.dimensions?.map((d) => d.size) || [],
    );

    return [...new Set(allSizes)];
  }, []);

  /* ================= THICKNESS ================= */

  const thicknesses = useMemo(() => {
    const all = products.flatMap(
      (p) =>
        p.details?.dimensions?.flatMap((d) =>
          d.options?.map((o) => o.thickness),
        ) || [],
    );

    return [...new Set(all)];
  }, []);

  /* ================= HANDLERS ================= */

  const handleSizeChange = (value) => {
    setParam({ size: value });
  };

  const handleThicknessChange = (value) => {
    setParam({ thickness: value });
  };

  return (
    <div className="mt-6 sm:mt-8 lg:mt-10">
      <div className="grid grid-cols-2 gap-6">
        {/* SIZE */}

        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
            {sizeLabel}
          </label>

          <select
            value={selectedSize}
            onChange={(e) => handleSizeChange(e.target.value)}
            className="w-full border border-blue-100 rounded-xl px-4 py-3 text-sm"
          >
            <option value="">{allLabel}</option>

            {sizes.map((size) => (
              <option key={size} value={size}>
                {size} cm
              </option>
            ))}
          </select>
        </div>

        {/* THICKNESS */}

        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
            {thicknessLabel}
          </label>

          <select
            value={selectedThickness}
            onChange={(e) => handleThicknessChange(e.target.value)}
            className="w-full border border-blue-100 rounded-xl px-4 py-3 text-sm"
          >
            <option value="">{allLabel}</option>

            {thicknesses.map((t) => (
              <option key={t} value={t}>
                {t} cm
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
