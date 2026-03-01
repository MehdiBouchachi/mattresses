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
    <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 lg:pb-40 bg-gradient-to-b from-beige-50 to-beige-200 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -top-32 -left-32 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-primary-200 rounded-full blur-[120px] lg:blur-[160px] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10 text-center md:text-start">
          <span className="uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs text-accent-400 font-medium">
            {badge}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            {titleLine1}
            <br />
            <span className="text-primary-600">{titleHighlight}</span>
          </h1>

          <p className="text-base sm:text-lg text-text-500 max-w-md mx-auto lg:mx-0 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6 justify-center lg:justify-start">
            <Button
              size="lg"
              fullWidth
              onClick={() => router.push(`/${locale}/mattresses`)}
              className="sm:w-auto bg-primary-600 text-primary-50 hover:bg-primary-700 shadow-[0_18px_40px_rgba(43,45,110,0.25)]"
            >
              {shop}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleScrollToCollection}
              className="sm:w-auto border-primary-600 text-primary-600"
            >
              {collection}
            </Button>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative mt-12 lg:mt-0">
          <img
            src="/images/mattresses.png"
            alt="Premium Mattress"
            className="rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] w-full shadow-[0_40px_100px_rgba(0,0,0,0.15)] lg:shadow-[0_80px_180px_rgba(0,0,0,0.18)]"
          />

          {/* Floating Badge */}
          <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-primary-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <p className="text-xs sm:text-sm font-semibold text-primary-600">
              {floatingBadge}
            </p>
          </div>
        </div>

        {/* Right Background Accent */}
        <div className="absolute -right-32 top-10 w-[350px] sm:w-[450px] lg:w-[500px] h-[350px] sm:h-[450px] lg:h-[500px] bg-primary-100 rounded-full blur-[100px] lg:blur-[140px] opacity-20 -z-10" />
      </div>
    </section>
  );
}
