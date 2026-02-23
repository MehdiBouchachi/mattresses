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
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(`/${locale}/mattresses`)}
            >
              Shop Mattresses
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleScrollToCollection}
            >
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
  );
}
