import FinalCTA from "@/components/sections/FinalCTA";
import ProductsSection from "@/components/sections/ProductsSection";
import TrustStrip from "@/components/sections/TrustStrip";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import WhyLitmadSection from "@/components/sections/WhyLitmadSection";
import { getTranslations } from "@/lib/i18n";

export default async function Home({ params }) {
  const { local = "en" } = await params;
  const translation = getTranslations(local);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ================= HERO ================= */}
      <HeroSection translation={translation} />

      {/* ================= TRUST STRIP ================= */}
      <TrustStrip translation={translation} />
      <CategoriesSection locale={local} translation={translation} />
      {/* ================= PRODUCTS SECTION ================= */}
      <ProductsSection translation={translation} />
      <WhyLitmadSection locale={local} translation={translation} />
      {/* ================= FINAL CTA ================= */}
      <FinalCTA translation={translation} />
    </div>
  );
}
