"use client";

import { useRouter, usePathname } from "next/navigation";
import Button from "../ui/Button";

export default function HeroSection({ translation }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const handleScrollToCollection = () => {
    const section = document.getElementById("collections");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  const {
    badge,
    titleLine1,
    titleHighlight,
    description,
    shop,
    collection,
    floatingBadge,
  } = translation?.home?.hero;

  return (
    <section className="relative pt-40 pb-40 bg-gradient-to-b from-beige-50 to-beige-200 overflow-hidden">
      {/* Soft Background Accent */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] 
bg-primary-200 rounded-full blur-[160px] opacity-30"
      />
      <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-28 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-10">
          <span className="uppercase tracking-[0.4em] text-xs text-accent-400 font-medium">
            {/*  Premium Sleep Experience */} {badge}
          </span>

          <h1 className="text-6xl font-semibold leading-[1.05] tracking-tight">
            {titleLine1}
            <br />
            <span className="text-primary-600">{titleHighlight}</span>
          </h1>

          <p className="text-lg text-text-500 max-w-lg leading-relaxed">
            {description}
          </p>

          <div className="flex gap-6 pt-6">
            <Button
              size="lg"
              onClick={() => router.push(`/${locale}/mattresses`)}
              className="bg-primary-600 text-primary-50 
              hover:bg-primary-700
              shadow-[0_18px_40px_rgba(43,45,110,0.25)]
              px-10"
            >
              {shop}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleScrollToCollection}
              className="border-primary-600 text-primary-600"
            >
              {collection}
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
            className="absolute -bottom-6 -left-6 bg-primary-50 px-6 py-4 rounded-2xl 
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
            <p className="text-sm font-semibold text-primary-600">
              {floatingBadge}
            </p>
          </div>
        </div>
        <div
          className="absolute -right-40 top-20 w-[500px] h-[500px] 
bg-primary-100 rounded-full blur-[140px] opacity-20 -z-10"
        />
      </div>
    </section>
  );
}
