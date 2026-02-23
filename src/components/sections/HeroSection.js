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
    <section className="relative pt-40 pb-40 bg-[var(--color-beige-300)] overflow-hidden">
      {/* Soft Background Accent */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--color-beige-400)] rounded-full blur-[140px] opacity-60" />

      <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-28 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-10">
          <span className="uppercase tracking-[0.4em] text-xs text-[var(--color-accent-400)] font-medium">
            Premium Sleep Experience
          </span>

          <h1 className="text-6xl font-semibold leading-[1.05] tracking-tight">
            Designed for
            <br />
            <span className="text-[var(--color-primary-600)]">
              Deep, Restful Sleep
            </span>
          </h1>

          <p className="text-lg text-[var(--color-text-500)] max-w-lg leading-relaxed">
            Precision-crafted mattresses engineered with breathable layers,
            adaptive support systems, and refined materials — built to restore
            your body night after night.
          </p>

          <div className="flex gap-6 pt-6">
            <Button
              size="lg"
              onClick={() => router.push(`/${locale}/mattresses`)}
              className="bg-[var(--color-primary-600)] text-[var(--color-primary-50)] 
              hover:bg-[var(--color-primary-700)]
              shadow-[0_18px_40px_rgba(43,45,110,0.25)]
              px-10"
            >
              Shop Mattresses
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleScrollToCollection}
              className="border-[var(--color-primary-600)] text-[var(--color-primary-600)]"
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
            className="absolute -bottom-6 -left-6 bg-[var(--color-primary-50)] px-6 py-4 rounded-2xl 
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
            <p className="text-sm font-semibold text-[var(--color-primary-600)]">
              Orthopedic Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
