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
    <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 bg-gradient-to-b from-white via-white to-white overflow-hidden">
      {/* Soft Center Blue Glow */}

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-8 text-center md:text-left">
          {/* Badge */}
          <span className="uppercase tracking-[0.35em] text-xs text-blue-600 font-semibold">
            {badge}
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-blue-950">
            {titleLine1}
            <br />
            <span className="relative inline-block text-blue-900">
              {titleHighlight}
              {/* Thin Red Accent Line */}
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-red-500 rounded-full"></span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
            {/* Primary CTA (Blue) */}
            <Button
              size="lg"
              fullWidth
              onClick={() => router.push(`/${locale}/mattresses`)}
              className="sm:w-auto  transition-all duration-300"
            >
              {shop}
            </Button>

            {/* Secondary Button */}
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleScrollToCollection}
              className="sm:w-auto  transition-all duration-300"
            >
              {collection}
            </Button>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative mt-12 md:mt-0">
          <img
            src="/images/mattresses.png"
            alt="Premium Mattress"
            className="rounded-3xl w-full shadow-[0_40px_100px_rgba(0,0,0,0.12)]"
          />

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-xl border border-blue-100">
            <p className="text-sm font-semibold text-blue-800">
              {floatingBadge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
