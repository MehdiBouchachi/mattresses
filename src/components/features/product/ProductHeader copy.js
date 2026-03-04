function ProductHeader({ breadcrumb, product, locale, router }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 mb-4">
        <button
          onClick={() => router.push(`/${locale}`)}
          className="hover:text-blue-700 transition"
        >
          {breadcrumb.home}
        </button>

        <span>/</span>

        <button
          onClick={() => router.push(`/${locale}/mattresses`)}
          className="hover:text-blue-700 transition"
        >
          {breadcrumb.collection}
        </button>

        <span>/</span>

        <span className="text-blue-900 font-medium truncate max-w-[150px]">
          {product.name}
        </span>
      </div>

      <button
        onClick={() => router.back()}
        className="text-xs sm:text-sm text-blue-900 hover:underline"
      >
        ← {breadcrumb.back}
      </button>
    </section>
  );
}
export default ProductHeader;