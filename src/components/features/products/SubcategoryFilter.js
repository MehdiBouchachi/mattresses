"use client";

import { categories } from "@/constants/products";

export default function SubcategoryFilter({ state, dispatch }) {
  const currentCategory = categories.find((c) => c.value === state.category);

  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-[#888] mb-6">
        Subcategory
      </h3>

      <div className="space-y-3 text-sm">
        <button
          onClick={() => dispatch({ type: "SET_SUBCATEGORY", payload: "all" })}
          className={`block transition ${
            state.subcategory === "all"
              ? "text-[#2B2D6E] font-semibold"
              : "text-[#555] hover:text-black"
          }`}
        >
          All
        </button>

        {currentCategory?.subcategories.map((sub) => (
          <button
            key={sub}
            onClick={() => dispatch({ type: "SET_SUBCATEGORY", payload: sub })}
            className={`block capitalize transition ${
              state.subcategory === sub
                ? "text-[#2B2D6E] font-semibold"
                : "text-[#555] hover:text-black"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>
    </div>
  );
}
