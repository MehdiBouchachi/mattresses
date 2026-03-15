import Button from "@/components/ui/Button";
import ProductCard from "../features/products/ProductCard";
import { getProductsWithDetails } from "@/lib/data-services/products";

async function ProductsSection({ translation, locale }) {
  /* ================= FEATURED PRODUCTS ================= */

  const products = await getProductsWithDetails({ featured: true });
  const featuredProducts = products.slice(0, 3);

  /* ================= PRICE RANGE ================= */

  const enhancedProducts = featuredProducts.map((p) => {
    const allPrices =
      p.details?.dimensions?.flatMap((d) => d.options?.map((o) => o.price)) ||
      [];

    if (allPrices.length === 0) return p;

    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);

    return {
      ...p,
      priceRange: { min, max },
    };
  });

  const {
    title,
    desc,
    viewAll,
    productCard: productCardTranslation,
  } = translation.home.products;

  return (
    <section className="py-18 sm:py-22 lg:py-32 bg-white" id="collections">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* ================= HEADER ================= */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12 sm:mb-16 lg:mb-24">
          <div className="text-center sm:text-start max-w-lg">
            <h3
              className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              tracking-tight
              text-blue-950
            "
            >
              {title}
            </h3>

            <p
              className="
              text-slate-600
              mt-3
              sm:mt-4
              max-w-md
              mx-auto
              lg:mx-0
              text-sm
              sm:text-base
              leading-relaxed
            "
            >
              {desc}
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Button
              href={`/${locale}/mattresses`}
              variant="secondary"
              size="md"
              fullWidth
              className="sm:w-auto"
            >
              {viewAll}
            </Button>
          </div>
        </div>

        {/* ================= PRODUCTS GRID ================= */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-7
          sm:gap-9
          lg:gap-12
          "
        >
          {enhancedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              translation={productCardTranslation}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
