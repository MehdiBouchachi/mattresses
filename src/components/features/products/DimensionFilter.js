"use client";

import { products } from "@/constants/products";

export default function DimensionFilter({ state, dispatch, translation }) {
  const { dimension: dimensionLabel, allDimensions: allLabel } = translation;

  const dimensions = [
    "all",
    ...new Set(
      products.flatMap((p) => p.details?.dimensions?.map((d) => d.size) || []),
    ),
  ];

  return (
    <div className="mt-6 sm:mt-8 lg:mt-10">
      <h3 className="text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-500 mb-3 sm:mb-5">
        {dimensionLabel}
      </h3>

      <select
        value={state.dimension}
        onChange={(e) =>
          dispatch({ type: "SET_DIMENSION", payload: e.target.value })
        }
        className="
          w-full
          border border-blue-100
          rounded-lg
          px-4 py-3
          text-sm
          bg-white
          text-slate-700
          focus:border-blue-600
          focus:ring-1
          focus:ring-blue-600
          outline-none
          transition
        "
      >
        {dimensions.map((dim) => (
          <option key={dim} value={dim}>
            {dim === "all" ? allLabel : dim}
          </option>
        ))}
      </select>
    </div>
  );
}
