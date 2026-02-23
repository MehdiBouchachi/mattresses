import FinalCTA from "@/components/sections/FinalCTA";
import ProductsSection from "@/components/sections/ProductsSection";
import TrustStrip from "@/components/sections/TrustStrip";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import WhyLitmadSection from "@/components/sections/WhyLitmadSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-beige-300)] text-[var(--color-text-primary)]">
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
