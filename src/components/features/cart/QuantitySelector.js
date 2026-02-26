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
          bg-beige-350
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
            hover:bg-beige-450
            transition
          "
        >
          −
        </button>

        <div
          className="
            px-4 sm:px-6
            text-sm sm:text-base
            font-medium
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
            hover:bg-beige-450
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
          text-error-500
          text-xs sm:text-sm
          hover:underline
          transition
        "
      >
        {removeLabel}
      </button>
    </div>
  );
}

export default QuantitySelector;
