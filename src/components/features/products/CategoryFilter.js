import { categories } from "@/constants/products";

export default function CategoryFilter({
  state,
  dispatch,
  translation,
  locale,
}) {
  const { category, all } = translation;

  const isRTL = locale === "ar";

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
        {category}
      </h3>

      <div
        className={`
          grid grid-cols-2 sm:grid-cols-1 gap-2
          ${isRTL ? "text-right" : ""}
        `}
      >
        {/* ALL */}
        <FilterItem
          active={state.category === "all"}
          onClick={() => dispatch({ type: "SET_CATEGORY", payload: "all" })}
          isRTL={isRTL}
        >
          {all}
        </FilterItem>

        {categories.map((cat) => (
          <FilterItem
            key={cat.value}
            active={state.category === cat.value}
            onClick={() =>
              dispatch({ type: "SET_CATEGORY", payload: cat.value })
            }
            isRTL={isRTL}
          >
            {cat.translations[locale]}
          </FilterItem>
        ))}
      </div>
    </div>
  );
}

/* ================= FILTER ITEM ================= */

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
