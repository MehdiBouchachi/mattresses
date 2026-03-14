import { getTranslations } from "@/lib/i18n";
import { getProductsWithDetails } from "@/lib/data-services/products";
import MattressesClient from "./MattressesClient";

export default async function MattressesPage({ params, searchParams }) {
  const { local } = await params;
  const resolvedSearchParams = await searchParams;

  const translation = getTranslations(local);
  const products = await getProductsWithDetails();

  return (
    <MattressesClient
      locale={local}
      translation={translation}
      searchParams={resolvedSearchParams}
      products={products}
    />
  );
}
