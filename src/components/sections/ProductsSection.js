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
  ].filter(Boolean); // remove undefined if any missing
  const {
    title,
    desc,
    viewAll,
    productCard: productCardTranslation,
  } = translation.home.products;
  return (
    <section className="py-32 bg-beige-150" id="collections">
      <div className="max-w-7xl mx-auto px-8">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <h3 className="text-4xl font-semibold">{title}</h3>
            <p className="text-text-body mt-3">{desc}</p>
          </div>

          <Button href={`/${locale}/mattresses`} variant="secondary" size="md">
            {viewAll}
          </Button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
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
