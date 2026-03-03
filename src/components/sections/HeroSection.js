"use client";

import { useRouter, usePathname } from "next/navigation";
import Button from "../ui/Button";

export default function HeroSection({ translation }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const isRTL = locale === "ar";

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
    <section
      className="relative overflow-hidden bg-white pt-24 sm:pt-28 lg:pt-36 pb-16 sm:pb-20 lg:pb-28"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Soft Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-100/40 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* ================= LEFT ================= */}
        <div className="space-y-6 sm:space-y-8 text-center md:text-start">
          {/* Badge */}
          <span className="uppercase tracking-[0.35em] text-[11px] sm:text-xs text-blue-700 font-semibold">
            {badge}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.1] text-blue-950">
            {titleLine1}
            <br />
            <span className="relative inline-block text-blue-900">
              {titleHighlight}
              <span className="absolute left-0 -bottom-2  w-full h-0.5 bg-red-500/70 rounded-full" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-md mx-auto md:mx-0 leading-relaxed">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Button
              size="lg"
              onClick={() => router.push(`/${locale}/mattresses`)}
              className="sm:w-auto"
            >
              {shop}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleScrollToCollection}
              className="sm:w-auto"
            >
              {collection}
            </Button>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative">
          {/* Card Background */}
          <div className="absolute inset-0 bg-blue-50 rounded-3xl scale-[0.96] -z-10" />

          <img
            src="/images/mattresses.png"
            alt="Premium Mattress"
            className="rounded-3xl w-full shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
          />

          {/* Floating Badge */}
          <div
            className={`absolute bottom-6 ${
              isRTL ? "right-6" : "left-6"
            } bg-white px-5 py-3 rounded-xl border border-blue-100 shadow-md`}
          >
            <p className="text-xs sm:text-sm font-medium text-blue-900">
              {floatingBadge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
