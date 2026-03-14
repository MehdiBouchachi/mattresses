import { getTranslations } from "@/lib/i18n";
import {
  getProductBySlug,
  getProductsWithDetails,
} from "@/lib/data-services/products";
import { notFound } from "next/navigation";
import ProductClient from "@/components/features/product/ProductClient";

export default async function ProductPage({ params }) {
  const { local, slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const { productPage } = getTranslations(local);
  const allProducts = await getProductsWithDetails();

  return (
    <ProductClient
      product={product}
      locale={local}
      allProducts={allProducts}
      translation={productPage}
    />
  );
}
