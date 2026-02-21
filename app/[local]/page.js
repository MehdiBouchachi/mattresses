"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";
import ProductsSection from "@/components/sections/ProductsSection";
import TrustStrip from "@/components/sections/TrustStrip";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3EEE6] text-[#1C1C1C]">
    

      {/* ================= HERO ================= */}
      <section className="pt-48 pb-32 bg-[#F3EEE6]">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <span className="uppercase tracking-[0.35em] text-xs text-[#C6A75E] font-medium">
              Premium Sleep Experience
            </span>

            <h2 className="text-6xl font-semibold leading-[1.05]">
              Designed for
              <br />
              Deep, Restful Sleep
            </h2>

            <p className="text-lg text-[#5F5F5F] max-w-md leading-relaxed">
              Precision-crafted mattresses engineered with breathable layers,
              adaptive support systems, and refined materials.
            </p>

            <div className="flex gap-5 pt-4">
              <Button variant="primary" size="lg">
                Shop Mattresses
              </Button>

              <Button variant="secondary" size="lg">
                View Collection
              </Button>
            </div>
          </div>

          <div>
            <img
              src="/images/mattresses.png"
              alt="Premium Mattress"
              className="rounded-[32px] shadow-[0_60px_160px_rgba(0,0,0,0.18)]"
            />
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <TrustStrip />

      {/* ================= PRODUCTS SECTION ================= */}
      <ProductsSection />

      {/* ================= FINAL CTA ================= */}
      <FinalCTA />

    </div>
  );
}
