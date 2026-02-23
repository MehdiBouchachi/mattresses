"use client";

import CategoryFilter from "./CategoryFilter";
import SubcategoryFilter from "./SubcategoryFilter";
import PriceFilter from "./PriceFilter";

export default function Filters({ state, dispatch }) {
  return (
    <section className="bg-white border-b border-beige-600">
      <div className="max-w-7xl mx-auto px-8 py-8 grid md:grid-cols-3 gap-16">
        <CategoryFilter state={state} dispatch={dispatch} />
        <SubcategoryFilter state={state} dispatch={dispatch} />
        <PriceFilter state={state} dispatch={dispatch} />
      </div>
    </section>
  );
}
