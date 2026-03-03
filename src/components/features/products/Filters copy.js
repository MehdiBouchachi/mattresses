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
    <section className="bg-white border-b border-t border-blue-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 sm:py-8">
        {/* MOBILE STACKED LAYOUT */}
        <div
          className=" grid
      grid-cols-1
      sm:grid-cols-2

      lg:grid-cols-3
      gap-6 md:gap-8 lg:gap-12"
        >
          {/* Column 1 */}
          <div className="space-y-6 sm:space-y-8">
            <CategoryFilter
              locale={locale}
              state={state}
              dispatch={dispatch}
              translation={filtersTranslation}
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-6 sm:space-y-8">
            <SubcategoryFilter
              locale={locale}
              state={state}
              dispatch={dispatch}
              translation={filtersTranslation}
            />
          </div>

          {/* Column 3 */}
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-1 space-y-6">
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
      </div>
    </section>
  );
}
