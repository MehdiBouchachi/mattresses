import { formatPrice } from "@/utils/helpers";

export default function ProductInfoCard({
  product,
  locale,
  hasDiscount,
  unitBasePrice,
  discountedUnitPrice,
  totalPrice,
  discount,
  quantity,
  setQuantity,
  dimensions,
  densities,
  selectedDimension,
  setSelectedDimension,
  selectedDensity,
  setSelectedDensity,
  selectedThickness,
  setSelectedThickness,
  sizeTranslation,
  thicknessTranslation,
  quantityTranslation,
  actionTranslation,
  guaranteesTranslation,
  handleCheckout,
  handleAddToCart,
}) {
  return (
    <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-blue-100">
      <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
        {product.category} · {product.subcategory}
      </p>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
        {product.name}
      </h1>

      <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
        {product.description}
      </p>

      {/* PRICE */}
      <div className="mb-6 sm:mb-8 border-b border-blue-100 pb-6">
        {hasDiscount && (
          <p className="text-sm text-gray-400 line-through mb-2">
            {formatPrice(unitBasePrice, locale)}
          </p>
        )}

        <div className="flex items-end gap-3 flex-wrap">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900">
            {formatPrice(
              quantity === 1 ? discountedUnitPrice : totalPrice,
              locale,
            )}
          </span>

          {quantity > 1 && (
            <span className="text-xs text-slate-600">
              ({quantity} × {formatPrice(discountedUnitPrice, locale)})
            </span>
          )}

          {hasDiscount && (
            <span className="text-xs bg-blue-900/10 text-blue-900 px-2 py-1 rounded-full">
              −{discount}%
            </span>
          )}
        </div>
      </div>

      {/* DENSITY */}
      {densities.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xs uppercase mb-3">Density</h3>

          <div className="grid grid-cols-2 gap-3">
            {densities.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDensity(d.value)}
                className={`py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border ${
                  selectedDensity === d.value
                    ? "bg-blue-900 text-white"
                    : "border-blue-100 hover:bg-blue-50"
                }`}
              >
                {d.value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SIZE */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-xs uppercase mb-3">{sizeTranslation}</h3>

        <div className="grid grid-cols-2 gap-3">
          {dimensions.map((dim) => (
            <button
              dir="ltr"
              key={dim.size}
              onClick={() => setSelectedDimension(dim)}
              className={`py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border ${
                selectedDimension?.size === dim.size
                  ? "bg-blue-900 text-white"
                  : "border-blue-100 hover:bg-blue-50"
              }`}
            >
              {dim.size} cm
            </button>
          ))}
        </div>
      </div>

      {/* THICKNESS */}
      {selectedDimension?.options?.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xs uppercase mb-3">{thicknessTranslation}</h3>

          <div className="grid grid-cols-3 gap-3">
            {selectedDimension.options
              .filter((opt) =>
                selectedDensity ? opt.density === selectedDensity : true,
              )
              .sort((a, b) => a.thickness - b.thickness)
              .map((opt) => (
                <button
                  key={`${opt.thickness}-${opt.density || "default"}`}
                  onClick={() => setSelectedThickness(opt)}
                  className={`py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border ${
                    selectedThickness?.thickness === opt.thickness &&
                    (!selectedDensity || opt.density === selectedDensity)
                      ? "bg-blue-900 text-white"
                      : "border-blue-100 hover:bg-blue-50"
                  }`}
                >
                  {opt.thickness} cm
                </button>
              ))}
          </div>
        </div>
      )}

      {/* QUANTITY */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-xs uppercase mb-3">{quantityTranslation}</h3>

        <div className="flex items-center border rounded-full w-fit overflow-hidden text-sm sm:text-base">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-100"
          >
            −
          </button>

          <div className="px-4">{quantity}</div>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="space-y-4">
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-900 text-white py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-medium hover:bg-blue-950 transition"
        >
          {actionTranslation.buyNow}
        </button>

        <button
          onClick={handleAddToCart}
          className="w-full border border-blue-900 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-blue-50 transition"
        >
          {actionTranslation.addToCart}
        </button>

        <div className="pt-4 border-t border-blue-100 text-sm text-center text-slate-600">
          {guaranteesTranslation}
        </div>
      </div>
    </div>
  );
}
