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
    <section className="relative pt-20 sm:pt-28 lg:pt-40 pb-16 sm:pb-24 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-6 sm:space-y-8 text-center md:text-left">
          {/* Badge */}
          <span className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-xs text-blue-600 font-semibold">
            {badge}
          </span>

          {/* Title */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-blue-950">
            {titleLine1}
            <br />
            <span className="relative inline-block text-blue-900">
              {titleHighlight}
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[2px] sm:h-[3px] bg-red-500 rounded-full"></span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-md sm:max-w-lg mx-auto md:mx-0 leading-relaxed">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-4 justify-center md:justify-start">
            <Button
              size="lg"
              fullWidth
              onClick={() => router.push(`/${locale}/mattresses`)}
              className="xs:w-auto text-sm sm:text-base"
            >
              {shop}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleScrollToCollection}
              className="xs:w-auto text-sm sm:text-base"
            >
              {collection}
            </Button>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative mt-8 md:mt-0">
          <img
            src="/images/mattresses.png"
            alt="Premium Mattress"
            className="rounded-2xl sm:rounded-3xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.1)] sm:shadow-[0_40px_100px_rgba(0,0,0,0.12)]"
          />

          {/* Floating Badge */}
          <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 bg-white px-4 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100">
            <p className="text-xs sm:text-sm font-semibold text-blue-800 whitespace-nowrap">
              {floatingBadge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
