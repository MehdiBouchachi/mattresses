"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Button from "../ui/Button";

export default function HeroSection({ translation }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const { badge, titleLine1, titleHighlight, description, shop, collection } =
    translation?.home?.hero || {};

  return (
    <section className="relative min-h-svh w-full flex items-center justify-center overflow-hidden text-white">
      {/* Background Image */}
      <Image
        src="/images/mattresses.png"
        alt="Luxury Mattress"
        fill
        priority
        className="object-cover object-center md:object-[center_60%]"
      />

      {/* Header readability gradient */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-36 bg-linear-to-b from-black/70 via-black/35 to-transparent z-1" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.45)_70%)]" />

      {/* Bottom contrast */}
      <div className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/70" />

      {/* Soft spotlight */}
      <div className="absolute -top-35 left-1/2 -translate-x-1/2 w-150 md:w-212.5 h-70 md:h-105 bg-white/20 blur-[130px] md:blur-[160px]" />

      {/* Side fade */}
      <div className="absolute inset-0 bg-linear-to-r from-black/35 via-transparent to-black/35" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-28 h-full flex flex-col justify-center items-stretch text-center">
        {/* Badge */}
        <p className="uppercase tracking-[0.32em] text-[10px] md:text-xs text-white/80 mb-4 font-medium">
          {badge}
        </p>

        {/* Title */}
        <h1
          className="
          font-semibold
          leading-[1.15]
          mb-6
          text-white
          drop-shadow-[0_10px_25px_rgba(0,0,0,0.55)]
          text-[clamp(24px,6.5vw,60px)]
        "
        >
          {titleLine1}
          <br />
          <span className="text-white/90">{titleHighlight}</span>
        </h1>

        {/* Description */}
        <p className="text-[14px] md:text-[16px] text-white/85 max-w-[310px] md:max-w-xl mx-auto leading-relaxed mb-8 md:mb-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mb-10">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => router.push(`/${locale}/mattresses`)}
          >
            {shop}
          </Button>

          <Button
            variant="secondaryHero"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() =>
              document
                .getElementById("collections")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {collection}
          </Button>
        </div>
      </div>
    </section>
  );
}
