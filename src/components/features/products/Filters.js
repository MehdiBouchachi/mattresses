"use client";

import CategoryFilter from "./CategoryFilter";
import SubcategoryFilter from "./SubcategoryFilter";
import PriceFilter from "./PriceFilter";
import DimensionFilter from "./DimensionFilter";

export default function Filters({
  state,
  dispatch,
  filtersTranslation,
  locale,
}) {
  return (
    <section className="bg-white border-b border-beige-600">
      <div className="max-w-7xl mx-auto px-8 py-8 grid md:grid-cols-3 gap-16">
        {/* Column 1 */}
        <CategoryFilter
          locale={locale}
          state={state}
          dispatch={dispatch}
          translation={filtersTranslation}
        />

        {/* Column 2 */}
        <SubcategoryFilter
          locale={locale}
          state={state}
          dispatch={dispatch}
          translation={filtersTranslation}
        />

        {/* Column 3 (Split vertically) */}
        <div>
          <PriceFilter
            locale={locale}
            state={state}
            dispatch={dispatch}
            translation={filtersTranslation}
          />
          <DimensionFilter
            state={state}
            dispatch={dispatch}
            translation={filtersTranslation}
          />
        </div>
      </div>
    </section>
  );
}
