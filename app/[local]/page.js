import FinalCTA from "@/components/sections/FinalCTA";
import ProductsSection from "@/components/sections/ProductsSection";
import TrustStrip from "@/components/sections/TrustStrip";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import WhyLitmadSection from "@/components/sections/WhyLitmadSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3EEE6] text-[#1C1C1C]">
      {/* ================= HERO ================= */}
      <HeroSection />

      {/* ================= TRUST STRIP ================= */}
      <TrustStrip />
      <CategoriesSection />
      {/* ================= PRODUCTS SECTION ================= */}
      <ProductsSection />
      <WhyLitmadSection />
      {/* ================= FINAL CTA ================= */}
      <FinalCTA />
    </div>
  );
}
