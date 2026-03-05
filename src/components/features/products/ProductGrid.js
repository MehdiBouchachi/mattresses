import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  productCardTranslation,
  locale = "en",
}) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-24 border border-blue-100 rounded-3xl bg-blue-50/30">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-900/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-blue-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7h18M5 7l1.5 12h11L19 7M9 7V5a3 3 0 016 0v2"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-semibold text-blue-950 mb-4">
          No Products Found
        </h3>

        <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
          No mattresses match your current filters. Adjust your selection or
          explore our full collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 sm:gap-8 md:gap-8 lg:gap-10">
      {products.map((product) => (
        <ProductCard
          locale={locale}
          key={product.id}
          product={product}
          translation={productCardTranslation}
        />
      ))}
    </div>
  );
}
