"use client";

import { categories } from "@/constants/products";

export default function SubcategoryFilter({ state, dispatch }) {
  const currentCategory = categories.find((c) => c.value === state.category);

  return (
    <div>
      <h3 className="text-sm uppercase tracking-[0.25em] text-text-subtle mb-8">
        Subcategory
      </h3>

      <div className="space-y-2">
        <button
          onClick={() => dispatch({ type: "SET_SUBCATEGORY", payload: "all" })}
          className={`w-full text-sm text-left px-4 py-2 rounded-lg transition-all duration-200 ${
            state.subcategory === "all"
              ? "bg-primary-50 text-primary-600 font-medium"
              : "text-text-600 hover:bg-beige-550"
          }`}
        >
          All
        </button>

        {currentCategory?.subcategories.map((sub) => (
          <button
            key={sub}
            onClick={() => dispatch({ type: "SET_SUBCATEGORY", payload: sub })}
            className={`w-full text-sm text-left px-4 py-2 rounded-lg capitalize transition-all duration-200 ${
              state.subcategory === sub
                ? "bg-primary-50 text-primary-600 font-medium"
                : "text-text-600 hover:bg-beige-550"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>
    </div>
  );
}
