"use client";

import { formatPrice } from "@/utils/helpers";

export default function PriceFilter({ state, dispatch, translation, locale }) {
  const formatInput = (value) => {
    const numeric = value.replace(/\s/g, "");
    if (!numeric) return "";
    return new Intl.NumberFormat("fr-DZ").format(Number(numeric));
  };

  const parseInput = (value) => Number(value.replace(/\s/g, ""));
  const { priceRange: priceRangeLabel, reset: resetLabel } = translation;
  return (
    <div>
      <h3 className="text-sm uppercase tracking-[0.25em] text-text-subtle mb-8">
        {priceRangeLabel}
      </h3>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={formatInput(String(state.minPrice))}
          onChange={(e) =>
            dispatch({
              type: "SET_PRICE",
              payload: {
                minPrice: parseInput(e.target.value),
              },
            })
          }
          className="border border-beige-700 rounded-lg px-4 py-2 w-full text-sm
          focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition"
        />

        <input
          type="text"
          value={formatInput(String(state.maxPrice))}
          onChange={(e) =>
            dispatch({
              type: "SET_PRICE",
              payload: {
                maxPrice: parseInput(e.target.value),
              },
            })
          }
          className="border border-[#D9D1C6] rounded-lg px-4 py-2 w-full text-sm
          focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition"
        />
      </div>

      <div className="flex justify-between items-center text-sm text-text-600">
        <span>
          {formatPrice(state.minPrice, locale)} –{" "}
          {formatPrice(state.maxPrice, locale)}
        </span>

        <button
          onClick={() => dispatch({ type: "RESET_PRICE" })}
          className="text-primary-600 font-medium hover:underline"
        >
          {resetLabel}
        </button>
      </div>
    </div>
  );
}
