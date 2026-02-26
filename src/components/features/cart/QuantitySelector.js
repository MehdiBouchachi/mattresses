function QuantitySelector({ data, actions, i18n = {} }) {
  const { quantity } = data;
  const { increase, decrease, remove } = actions;
  const { remove: removeLabel } = i18n;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-beige-350 rounded-full overflow-hidden">
        <button
          onClick={decrease}
          className="px-4 py-2 hover:bg-beige-450 transition"
        >
          −
        </button>

        <div className="px-6 font-medium">{quantity}</div>

        <button
          onClick={increase}
          className="px-4 py-2 hover:bg-beige-450 transition"
        >
          +
        </button>
      </div>

      <button
        onClick={remove}
        className="text-error-500 text-sm hover:underline"
      >
        {removeLabel}
      </button>
    </div>
  );
}
export default QuantitySelector;
