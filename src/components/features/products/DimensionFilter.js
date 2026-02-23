"use client";

import { products } from "@/constants/products";

export default function DimensionFilter({ state, dispatch }) {
  const dimensions = [
    "all",
    ...new Set(
      products.flatMap((p) => p.details?.dimensions?.map((d) => d.size) || []),
    ),
  ];

  return (
    <div className="mt-10">
      <h3 className="text-sm uppercase tracking-[0.25em] text-text-subtle mb-6">
        Dimension
      </h3>

      <select
        value={state.dimension}
        onChange={(e) =>
          dispatch({ type: "SET_DIMENSION", payload: e.target.value })
        }
        className="w-full border border-beige-700 rounded-lg px-4 py-3 text-sm
        bg-white text-text-600
        focus:border-primary-600 focus:ring-1 focus:ring-primary-600
        outline-none transition"
      >
        {dimensions.map((dim) => (
          <option key={dim} value={dim}>
            {dim === "all" ? "All Dimensions" : dim}
          </option>
        ))}
      </select>
    </div>
  );
}
