function QuantitySelector({ data, actions, i18n = {}, locale }) {
  const { quantity } = data;
  const { increase, decrease, remove } = actions;
  const { remove: removeLabel } = i18n;

  const isRTL = locale === "ar";

  return (
    <div className="flex items-center gap-4 flex-wrap">
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
            px-4 py-2
            text-base
            text-blue-900
            hover:bg-blue-100
            transition
          "
        >
          −
        </button>

        <div
          className="
            px-6
            text-base
            font-semibold
            text-blue-900
            select-none
          "
        >
          {quantity}
        </div>

        <button
          onClick={increase}
          className="
            px-4 py-2
            text-base
            text-blue-900
            hover:bg-blue-100
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
          text-red-600
          text-sm
          font-medium
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
