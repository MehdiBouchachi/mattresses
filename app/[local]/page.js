import FinalCTA from "@/components/sections/FinalCTA";
import ProductsSection from "@/components/sections/ProductsSection";
import TrustStrip from "@/components/sections/TrustStrip";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import WhyLitmadSection from "@/components/sections/WhyLitmadSection";
import { getTranslations } from "@/lib/i18n";
import { getProductsWithDetails } from "@/lib/data-services/products";

//import MattressEngineeringSection from "@/components/sections/MattressEngineeringSection";

export default async function Home({ params }) {
  const { local = "en" } = await params;
  const translation = getTranslations(local);
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
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeroSection translation={translation} />

      <TrustStrip translation={translation} />
      <CategoriesSection locale={local} translation={translation} />
      <ProductsSection
        translation={translation}
        locale={local}
        enhancedProducts={enhancedProducts}
      />

      {/* <MattressEngineeringSection /> */}
      <WhyLitmadSection locale={local} translation={translation} />
      <FinalCTA translation={translation} locale={local} />
    </div>
  );
}
