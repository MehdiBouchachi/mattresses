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

  const subcategories = currentCategory?.subcategories ?? [];
  const isRTL = locale === "ar";

  // Hide if no subcategories
  if (!subcategories.length) return null;

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <h3
        className={`
          text-xs sm:text-sm
          mb-4 sm:mb-6
          text-slate-500
          ${isRTL ? "text-right tracking-normal" : "uppercase tracking-[0.25em] text-left"}
        `}
      >
        {subcategory}
      </h3>

      <div
        className={`grid grid-cols-2 sm:grid-cols-1 gap-2 ${
          isRTL ? "text-right" : ""
        }`}
      >
        {/* ALL */}
        <FilterItem
          active={state.subcategory === "all"}
          onClick={() => dispatch({ type: "SET_SUBCATEGORY", payload: "all" })}
          isRTL={isRTL}
        >
          {all}
        </FilterItem>

        {subcategories.map((sub) => (
          <FilterItem
            key={sub.value}
            active={state.subcategory === sub.value}
            onClick={() =>
              dispatch({
                type: "SET_SUBCATEGORY",
                payload: sub.value,
              })
            }
            isRTL={isRTL}
          >
            {sub.translations?.[locale] ?? sub.translations?.en ?? sub.value}
          </FilterItem>
        ))}
      </div>
    </div>
  );
}

/* ================= REUSABLE ITEM ================= */

function FilterItem({ children, active, onClick, isRTL }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        text-sm
        px-4 py-2.5
        rounded-lg
        transition-all duration-200
        ${isRTL ? "text-right" : "text-left"}
        ${
          active
            ? "bg-blue-50 text-blue-900 font-medium"
            : "text-slate-600 hover:bg-blue-50/60 hover:text-blue-900"
        }
      `}
    >
      {children}
    </button>
  );
}
