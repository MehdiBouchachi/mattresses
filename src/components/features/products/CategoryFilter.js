import { categories } from "@/constants/products";

export default function CategoryFilter({
  state,
  dispatch,
  translation,
  locale,
}) {
  const { category, all } = translation;

  return (
    <div>
      <h3 className="text-sm uppercase tracking-[0.25em] text-text-subtle mb-8 text-start">
        {category}
      </h3>

      <div className="space-y-2">
        {/* ALL BUTTON */}
        <button
          onClick={() => dispatch({ type: "SET_CATEGORY", payload: "all" })}
          className={`w-full text-sm text-start px-4 py-2 rounded-lg transition-all duration-200 ${
            state.category === "all"
              ? "bg-primary-50 text-primary-600 font-medium"
              : "text-text-600 hover:bg-beige-550"
          }`}
        >
          {all}
        </button>

        {/* CATEGORY LIST */}
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() =>
              dispatch({ type: "SET_CATEGORY", payload: cat.value })
            }
            className={`w-full text-sm text-start px-4 py-2 rounded-lg transition-all duration-200 ${
              state.category === cat.value
                ? "bg-primary-50 text-primary-600 font-medium"
                : "text-text-600 hover:bg-beige-550"
            }`}
          >
            {cat.translations[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
