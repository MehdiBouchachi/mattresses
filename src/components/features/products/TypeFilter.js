"use client";

export default function TypeFilter({
  translation,
  locale = "en",
  searchParams,
  setParam,
  categories,
}) {
  const { type: typeLabel, all } = translation;

  const isRTL = locale === "ar";

  /* ================= URL VALUES ================= */

  const currentSubcategoryValue = searchParams.get("subcategory") || "all";
  const activeType = searchParams.get("type") || "all";

  /* ================= FIND SELECTED SUBCATEGORY ================= */

  const currentSubcategory = categories.find(
    (c) => c.value === currentSubcategoryValue && c.type === "subcategory",
  );

  /* ================= GET TYPES (children of subcategory) ================= */

  const types = currentSubcategory
    ? categories.filter(
        (c) => c.parent_id === currentSubcategory.id && c.type === "type",
      )
    : [];

  // Hide if no subcategory selected or no types
  if (!currentSubcategory || !types.length) return null;

  const handleType = (value) => {
    if (value === "all") {
      setParam({ type: "" });
    } else {
      setParam({ type: value });
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
        {typeLabel}
      </h3>

      <div
        className={`grid grid-cols-2 sm:grid-cols-1 gap-2 ${
          isRTL ? "text-right" : ""
        }`}
      >
        {/* ALL */}

        <FilterItem
          active={activeType === "all"}
          onClick={() => handleType("all")}
          isRTL={isRTL}
        >
          {all}
        </FilterItem>

        {types.map((t) => (
          <FilterItem
            key={t.id}
            active={activeType === t.value}
            onClick={() => handleType(t.value)}
            isRTL={isRTL}
          >
            {t.translations?.[locale] ?? t.translations?.en ?? t.value}
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
