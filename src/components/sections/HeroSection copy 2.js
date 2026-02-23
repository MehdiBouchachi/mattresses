"use client";

import { useRouter, usePathname } from "next/navigation";
import Button from "../ui/Button";

export default function HeroSection() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const handleScrollToCollection = () => {
    const section = document.getElementById("collections");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-56 pb-40 bg-[#F3EEE6] overflow-hidden">
      {/* Soft Background Accent */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#EADFD2] rounded-full blur-[140px] opacity-60" />

      <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-28 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-10">
          <span className="uppercase tracking-[0.4em] text-xs text-[#C6A75E] font-medium">
            Premium Sleep Experience
          </span>

          <h1 className="text-6xl font-semibold leading-[1.05] tracking-tight">
            Designed for
            <br />
            <span className="text-[#2B2D6E]">Deep, Restful Sleep</span>
          </h1>

          <p className="text-lg text-[#5F5F5F] max-w-lg leading-relaxed">
            Precision-crafted mattresses engineered with breathable layers,
            adaptive support systems, and refined materials — built to restore
            your body night after night.
          </p>

          <div className="flex gap-6 pt-6">
            <Button
              size="lg"
              onClick={() => router.push(`/${locale}/mattresses`)}
              className="bg-[#2B2D6E] text-white 
              hover:bg-[#1E2052]
              shadow-[0_18px_40px_rgba(43,45,110,0.25)]
              px-10"
            >
              Shop Mattresses
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleScrollToCollection}
              className="border-[#2B2D6E] text-[#2B2D6E]"
            >
              View Collection
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="/images/mattresses.png"
            alt="Premium Mattress"
            className="rounded-[40px] 
            shadow-[0_80px_180px_rgba(0,0,0,0.18)]"
          />

          {/* Floating Badge */}
          <div
            className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl 
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
            <p className="text-sm font-semibold text-[#2B2D6E]">
              Orthopedic Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
