"use client";

import { categories } from "@/constants/products";

export default function SubcategoryFilter({
  translation,
  locale = "en",
  searchParams,
  setParam,
}) {
  const { subcategory, all } = translation;

  const isRTL = locale === "ar";

  /* ================= URL VALUES ================= */

  const currentCategoryValue = searchParams.get("category") || "all";
  const activeSubcategory = searchParams.get("subcategory") || "all";

  /* ================= FIND CATEGORY ================= */

  const currentCategory = categories.find(
    (c) => c.value === currentCategoryValue,
  );

  const subcategories = currentCategory?.subcategories ?? [];

  // Hide if no subcategories
  if (!subcategories.length) return null;

  const handleSubcategory = (value) => {
    if (value === "all") {
      setParam({ subcategory: "" });
    } else {
      setParam({ subcategory: value });
    }
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <h3
        className={`
          text-xs sm:text-sm
          mb-4 sm:mb-6
          text-slate-500
          ${
            isRTL
              ? "text-right tracking-normal"
              : "uppercase tracking-[0.25em] text-left"
          }
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
          active={activeSubcategory === "all"}
          onClick={() => handleSubcategory("all")}
          isRTL={isRTL}
        >
          {all}
        </FilterItem>

        {subcategories.map((sub) => (
          <FilterItem
            key={sub.value}
            active={activeSubcategory === sub.value}
            onClick={() => handleSubcategory(sub.value)}
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
