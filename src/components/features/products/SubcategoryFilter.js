"use client";

import { categories } from "@/constants/products";

export default function SubcategoryFilter({
  state,
  dispatch,
  translation,
  locale = "en",
}) {
  const { subcategory, all } = translation;

  const currentCategory = categories.find((c) => c.value === state.category);

  return (
    <div>
      <h3 className="text-sm uppercase tracking-[0.25em] text-text-subtle mb-8 text-start">
        {subcategory}
      </h3>

      <div className="space-y-2">
        {/* ALL BUTTON */}
        <button
          onClick={() => dispatch({ type: "SET_SUBCATEGORY", payload: "all" })}
          className={`w-full text-sm text-start px-4 py-2 rounded-lg transition-all duration-200 ${
            state.subcategory === "all"
              ? "bg-primary-50 text-primary-600 font-medium"
              : "text-text-600 hover:bg-beige-550"
          }`}
        >
          {all}
        </button>

        {/* SUBCATEGORY LIST */}
        {currentCategory?.subcategories.map((sub) => (
          <button
            key={sub.value}
            onClick={() =>
              dispatch({ type: "SET_SUBCATEGORY", payload: sub.value })
            }
            className={`w-full text-sm text-start px-4 py-2 rounded-lg transition-all duration-200 ${
              state.subcategory === sub.value
                ? "bg-primary-50 text-primary-600 font-medium"
                : "text-text-600 hover:bg-beige-550"
            }`}
          >
            {sub.translations?.[locale] ?? sub.translations.en}
          </button>
        ))}
      </div>
    </div>
  );
}
