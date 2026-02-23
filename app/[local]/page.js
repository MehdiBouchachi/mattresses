import Button from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";
import ProductsSection from "@/components/sections/ProductsSection";
import TrustStrip from "@/components/sections/TrustStrip";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3EEE6] text-[#1C1C1C]">
      {/* ================= HERO ================= */}
      <HeroSection />

      {/* ================= TRUST STRIP ================= */}
      <TrustStrip />

      {/* ================= PRODUCTS SECTION ================= */}
      <ProductsSection />

      {/* ================= FINAL CTA ================= */}
      <FinalCTA />
    </div>
  );
}
