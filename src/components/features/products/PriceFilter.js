"use client";

import { formatPrice } from "@/utils/helpers";

export default function PriceFilter({ state, dispatch, translation, locale }) {
  const { priceRange: priceRangeLabel, reset: resetLabel } = translation;

  const formatInput = (value) => {
    const numeric = value.replace(/\s/g, "");
    if (!numeric) return "";
    return new Intl.NumberFormat("fr-DZ").format(Number(numeric));
  };

  const parseInput = (value) => Number(value.replace(/\s/g, "")) || 0;

  return (
    <div>
      <h3 className="text-xs sm:text-sm uppercase tracking-[0.25em] text-text-subtle mb-4 sm:mb-6">
        {priceRangeLabel}
      </h3>

      {/* INPUTS */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
        <PriceInput
          value={formatInput(String(state.minPrice))}
          onChange={(value) =>
            dispatch({
              type: "SET_PRICE",
              payload: { minPrice: parseInput(value) },
            })
          }
        />

        <PriceInput
          value={formatInput(String(state.maxPrice))}
          onChange={(value) =>
            dispatch({
              type: "SET_PRICE",
              payload: { maxPrice: parseInput(value) },
            })
          }
        />
      </div>

      {/* RANGE SUMMARY */}
      <div className="flex justify-between items-center text-xs sm:text-sm text-text-600">
        <span className="font-medium">
          {formatPrice(state.minPrice, locale)} –{" "}
          {formatPrice(state.maxPrice, locale)}
        </span>

        <button
          onClick={() => dispatch({ type: "RESET_PRICE" })}
          className="text-primary-600 font-medium hover:opacity-80 transition"
        >
          {resetLabel}
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE PRICE INPUT ================= */

function PriceInput({ value, onChange }) {
  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-beige-700 rounded-lg px-4 py-2 w-full text-sm
          focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition
      "
    />
  );
}
