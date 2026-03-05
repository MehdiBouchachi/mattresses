import { formatPrice } from "@/utils/helpers";

export default function PriceFilter({
  translation,
  locale,
  searchParams,
  setParam,
}) {
  const { priceRange: priceRangeLabel, reset: resetLabel } = translation;

  /* ================= URL VALUES ================= */

  const minPrice = searchParams.get("min")
    ? Number(searchParams.get("min"))
    : 0;

  const maxPrice = searchParams.get("max")
    ? Number(searchParams.get("max"))
    : 200000;

  /* ================= INPUT HELPERS ================= */

  const formatInput = (value) => {
    const numeric = value.replace(/\s/g, "");
    if (!numeric) return "";
    return new Intl.NumberFormat("fr-DZ").format(Number(numeric));
  };

  const parseInput = (value) => Number(value.replace(/\s/g, "")) || 0;

  /* ================= CHANGE HANDLERS ================= */

  const handleMinChange = (value) => {
    const parsed = parseInput(value);
    setParam("min", parsed || "");
  };

  const handleMaxChange = (value) => {
    const parsed = parseInput(value);
    setParam("max", parsed || "");
  };

  const resetPrices = () => {
    setParam("min", "");
    setParam("max", "");
  };

  return (
    <div>
      <h3 className="text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-500 mb-4 sm:mb-6">
        {priceRangeLabel}
      </h3>

      {/* INPUTS */}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
        <PriceInput
          value={formatInput(String(minPrice))}
          onChange={handleMinChange}
        />

        <PriceInput
          value={formatInput(String(maxPrice))}
          onChange={handleMaxChange}
        />
      </div>

      {/* RANGE SUMMARY */}

      <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600">
        <span className="font-medium text-blue-900">
          {formatPrice(minPrice, locale)} – {formatPrice(maxPrice, locale)}
        </span>

        <button
          onClick={resetPrices}
          className="text-blue-700 font-medium hover:text-blue-900 transition"
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
      className="
        w-full
        rounded-lg
        border border-blue-100
        bg-white
        px-4 py-2
        text-sm
        text-slate-700
        transition
        focus:border-blue-800
        focus:ring-1
        focus:ring-blue-800
        outline-none
      "
    />
  );
}
