"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/mattresses.png"
        alt="Luxury Mattress"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* French Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-[#EAF0FF]/60 to-white/90 backdrop-blur-[2px]" />

      {/* Top French Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#0055A4] via-white to-[#EF4135]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl space-y-8">
        <p className="uppercase tracking-[0.5em] text-xs font-semibold text-[#0055A4]">
          Premium Sleep Experience
        </p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] text-[#0A1F44]">
          Designed for
          <br />
          <span className="bg-gradient-to-r from-[#0055A4] to-[#3A6BFF] bg-clip-text text-transparent">
            Deep, Restful Sleep
          </span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Precision-crafted mattresses engineered with breathable layers and
          advanced support systems — built to restore your body night after
          night.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
          <button
            onClick={() => router.push("/mattresses")}
            className="px-10 py-4 bg-[#0A1F44] text-white rounded-full hover:bg-[#0055A4] transition shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
          >
            Shop Mattresses
          </button>

          <button
            onClick={() => router.push("/collection")}
            className="px-10 py-4 border border-[#0A1F44]/30 text-[#0A1F44] rounded-full hover:bg-[#0A1F44] hover:text-white transition"
          >
            View Collection
          </button>
        </div>
      </div>

      {/* Soft Blue Glow */}
      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#3A6BFF]/20 blur-[120px]" />
    </section>
  );
}
