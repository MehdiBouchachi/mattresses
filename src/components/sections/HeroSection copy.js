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
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden text-white">
      {/* Background */}
      <Image
        src="/images/mattresses.png"
        alt="Luxury Mattress"
        fill
        priority
        className="object-cover object-center md:object-[center_60%]"
      />

      {/* Main cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-28 h-full flex flex-col justify-center items-stretch text-center">
        {/* Badge */}
        <p className="uppercase tracking-[0.32em] text-[11px] text-white/80 mb-4 font-medium">
          {badge}
        </p>

        {/* Title */}
        <h1 className="font-semibold leading-[1.1] tracking-tight mb-6 text-[clamp(28px,6vw,60px)] drop-shadow-xl">
          {titleLine1}
          <br />
          <span className="text-white/90">{titleHighlight}</span>
        </h1>

        {/* Description */}
        <p className="text-[15px] md:text-[16px] text-white/85 max-w-lg mx-auto leading-relaxed mb-10">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
