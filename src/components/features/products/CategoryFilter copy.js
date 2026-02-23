"use client";

import { categories } from "@/constants/products";

export default function CategoryFilter({ state, dispatch }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-[#888] mb-6">
        Category
      </h3>

      <div className="space-y-3 text-sm">
        <button
          onClick={() => dispatch({ type: "SET_CATEGORY", payload: "all" })}
          className={`block transition ${
            state.category === "all"
              ? "text-[#2B2D6E] font-semibold"
              : "text-[#555] hover:text-black"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() =>
              dispatch({ type: "SET_CATEGORY", payload: cat.value })
            }
            className={`block transition ${
              state.category === cat.value
                ? "text-[#2B2D6E] font-semibold"
                : "text-[#555] hover:text-black"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
