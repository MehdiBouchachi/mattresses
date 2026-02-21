"use client";

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function PriceFilter({ state, dispatch }) {
  const formatInput = (value) => {
    const numeric = value.replace(/\s/g, "");
    if (!numeric) return "";
    return new Intl.NumberFormat("fr-DZ").format(Number(numeric));
  };

  const parseInput = (value) => Number(value.replace(/\s/g, ""));

  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-[#888] mb-6">
        Price Range
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
          className="border border-[#D9D1C6] rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-[#2B2D6E] outline-none"
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
          className="border border-[#D9D1C6] rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-[#2B2D6E] outline-none"
        />
      </div>

      <p className="text-xs text-[#6A6A6A]">
        {formatPrice(state.minPrice)} – {formatPrice(state.maxPrice)}
      </p>

      <button
        onClick={() => dispatch({ type: "RESET_PRICE" })}
        className="mt-4 text-sm font-medium text-[#2B2D6E] hover:underline"
      >
        Reset Price
      </button>
    </div>
  );
}
