function QuantitySelector({ data, actions, i18n = {}, locale }) {
  const { quantity } = data;
  const { increase, decrease, remove } = actions;
  const { remove: removeLabel } = i18n;

  const isRTL = locale === "ar";

  return (
    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
      {/* Quantity Control */}
      <div
        className="
          flex items-center
          bg-blue-50
          border border-blue-100
          rounded-full
          overflow-hidden
        "
      >
        <button
          onClick={decrease}
          className="
            px-3 sm:px-4
            py-1.5 sm:py-2
            text-sm sm:text-base
            text-blue-900
            hover:bg-blue-100
            active:scale-95
            transition
          "
        >
          −
        </button>

        <div
          className="
            px-4 sm:px-6
            text-sm sm:text-base
            font-semibold
            text-blue-900
            select-none
            min-w-[32px] sm:min-w-[40px]
            text-center
          "
        >
          {quantity}
        </div>

        <button
          onClick={increase}
          className="
            px-3 sm:px-4
            py-1.5 sm:py-2
            text-sm sm:text-base
            text-blue-900
            hover:bg-blue-100
            active:scale-95
            transition
          "
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={remove}
        className="
          text-xs sm:text-sm
          text-red-600
          font-medium
          hover:underline
          hover:text-red-700
          transition
        "
      >
        {removeLabel}
      </button>
    </div>
  );
}

export default QuantitySelector;
