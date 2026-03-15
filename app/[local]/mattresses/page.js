import { getTranslations } from "@/lib/i18n";
import { getProductsWithDetails } from "@/lib/data-services/products";
import { getAllCategories } from "@/lib/data-services/categories";
import { getAllDimensions } from "@/lib/data-services/dimensions";
import { getAllThicknesses } from "@/lib/data-services/thicknesses";
import MattressesClient from "./MattressesClient";

export default async function MattressesPage({ params, searchParams }) {
  const { local } = await params;
  const resolvedSearchParams = await searchParams;

  const translation = getTranslations(local);

  const [products, categories, dimensions, thicknesses] = await Promise.all([
    getProductsWithDetails(),
    getAllCategories(),
    getAllDimensions(),
    getAllThicknesses(),
  ]);

  return (
    <MattressesClient
      locale={local}
      translation={translation}
      searchParams={resolvedSearchParams}
      products={products}
      categories={categories}
      dimensions={dimensions}
      thicknesses={thicknesses}
    />
  );
}
