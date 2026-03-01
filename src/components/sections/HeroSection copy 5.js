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
        className="absolute inset-0 w-full h-full object-cover scale-[1.03]"
      />

      {/* Soft Top Light Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent" />

      {/* Bottom Depth Shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/15 via-transparent to-transparent" />

      {/* Subtle Radial Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.4)_40%,rgba(255,255,255,0.15)_70%,transparent_100%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl space-y-8">
        <p className="uppercase tracking-[0.5em] text-xs font-semibold text-[#0055A4]">
          Premium Sleep Experience
        </p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] text-[#0A1F44]">
          Designed for
          <br />
          <span className="text-[#0055A4]">Deep, Restful Sleep</span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Precision-crafted mattresses engineered with breathable layers and
          advanced support systems — built to restore your body night after
          night.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
          {/* Primary */}
          <button
            onClick={() => router.push("/mattresses")}
            className="
              px-10 py-4 
              bg-[#0A1F44] 
              text-white 
              rounded-full 
              font-medium 
              tracking-wide
              transition-all duration-300
              shadow-[0_12px_30px_rgba(10,31,68,0.25)]
              hover:shadow-[0_20px_50px_rgba(10,31,68,0.35)]
              hover:-translate-y-1
              hover:bg-[#0055A4]
            "
          >
            Shop Mattresses
          </button>

          {/* Secondary */}
          <button
            onClick={() => router.push("/collection")}
            className="
              px-10 py-4 
              rounded-full 
              font-medium 
              tracking-wide
              border border-[#0A1F44]/25
              text-[#0A1F44]
              bg-white/60 backdrop-blur-sm
              transition-all duration-300
              hover:bg-[#0A1F44]
              hover:text-white
              hover:-translate-y-1
            "
          >
            View Collection
          </button>
        </div>
      </div>

      {/* Controlled Bottom Blue Atmosphere */}
      <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#0055A4]/15 blur-[140px]" />
    </section>
  );
}
