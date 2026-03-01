"use client";
import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import ProductCard from "../features/products/ProductCard";
import { products } from "@/constants/products";

function ProductsSection({ translation }) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  // 🎯 CURATED PRODUCTS
  const normalProduct = products.find((p) => p.available && !p.oldPrice);
  const discountedProduct = products.find((p) => p.available && p.oldPrice);
  const soldOutProduct = products.find((p) => !p.available);

  const featuredProducts = [
    normalProduct,
    discountedProduct,
    soldOutProduct,
  ].filter(Boolean);
  /* ================= ENHANCE PRODUCTS WITH PRICE ================= */

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
    <section className="py-16 sm:py-20 lg:py-28 bg-white" id="collections">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14 lg:mb-20">
          <div className="text-center sm:text-start">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-950">
              {title}
            </h3>

            <p className="text-slate-600 mt-2 sm:mt-3 text-sm sm:text-base max-w-md mx-auto sm:mx-0">
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

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {enhancedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              translation={productCardTranslation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
