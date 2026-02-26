import { products } from "@/constants/products";
import ProductClient from "./ProductClient";
import { getTranslations } from "@/lib/i18n";

export default async function ProductPage({ params }) {
  const { local, slug } = await params;

  const product = products.find((p) => p.slug === slug);
  const { productPage } = getTranslations(local);
  if (!product) return null;

  return (
    <ProductClient
      product={product}
      locale={local}
      allProducts={products}
      translation={productPage}
    />
  );
}
