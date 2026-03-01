"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image */}
      <img
        src="/images/mattresses.png"
        alt="Premium Mattress"
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />

      {/* Depth Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-white/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/10 via-transparent to-transparent" />

      {/* Subtle Darkening Layer for Depth */}
      <div className="absolute inset-0 bg-[#0B2545]/5" />

      {/* French Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#0055A4] via-white to-[#EF4135]" />

      {/* Background Brand Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[70px] sm:text-[100px] md:text-[150px] lg:text-[190px] font-semibold text-[#0B2545] opacity-[0.03] tracking-tight whitespace-nowrap">
          Empreinte Flex
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl space-y-8">
        {/* Badge */}
        <p className="uppercase tracking-[0.5em] text-xs font-semibold text-[#0055A4]">
          Premium Sleep Experience
        </p>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] text-[#0B2545]">
          Designed for
          <br />
          <span className="bg-gradient-to-r from-[#0B2545] via-[#0055A4] to-[#3B82F6] bg-clip-text text-transparent">
            Deep, Restful Sleep
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Precision-crafted mattresses engineered with breathable layers and
          advanced support systems — designed to restore your body and elevate
          your sleep, night after night.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
          <button
            onClick={() => router.push("/mattresses")}
            className="px-10 py-4 bg-[#0B2545] text-white rounded-full tracking-wide hover:bg-[#0055A4] transition shadow-[0_30px_90px_rgba(11,37,69,0.25)] hover:shadow-[0_35px_120px_rgba(11,37,69,0.35)]"
          >
            Shop Mattresses
          </button>

          <button
            onClick={() => router.push("/collection")}
            className="px-10 py-4 border border-[#0B2545]/30 text-[#0B2545] rounded-full hover:bg-[#0B2545] hover:text-white transition"
          >
            View Collection
          </button>
        </div>
      </div>

      {/* Ambient Bottom Glow */}
      <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#0055A4]/20 blur-[150px]" />
    </section>
  );
}
