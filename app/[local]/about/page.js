"use client";
import { FiNavigation, FiMapPin, FiExternalLink } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="bg-beige-100 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] md:min-h-[75vh] flex items-center justify-center text-center px-6 md:px-8">
        {/* Ghost branding */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[90px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-semibold text-text-primary opacity-[0.025] tracking-tight">
            LITMAD
          </span>
        </div>

        <div className="relative max-w-xl sm:max-w-2xl md:max-w-3xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em] text-text-soft mb-4 sm:mb-6">
            Our Philosophy
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-snug">
            Comfort Is Structured Silence.
          </h1>

          <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-text-muted leading-relaxed">
            It is the invisible architecture that supports the body — night
            after night.
          </p>
        </div>
      </section>

      {/* ================= FULL BLEED FRAME ================= */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[85vh]">
        <img
          src="/images/about-1.jpg"
          alt="Craft process"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-10 sm:bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 text-center text-white max-w-xs sm:max-w-md md:max-w-2xl px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug">
            Every Layer Carries Intention.
          </h2>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base lg:text-lg opacity-90 leading-relaxed">
            What feels effortless is shaped through calibration, discipline, and
            repetition.
          </p>
        </div>
      </section>

      {/* ================= EDITORIAL BLOCK ================= */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-20 sm:py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* TEXT */}
          <div className="space-y-6 sm:space-y-8 max-w-lg mx-auto md:mx-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary leading-snug">
              Engineering Beyond Surface Softness
            </h3>

            <p className="text-text-primary text-base sm:text-lg leading-relaxed">
              Softness is immediate. Structure is lasting.
            </p>

            <p className="text-sm sm:text-base text-text-body leading-relaxed">
              Our mattresses are engineered to maintain alignment, distribute
              pressure evenly, and regulate airflow — without losing integrity
              over time.
            </p>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Comfort is not padding. It is layered architecture.
            </p>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full sm:w-[85%] md:w-[90%]">
              <img
                src="/images/about-2.jpg"
                alt="Assembly"
                className="rounded-2xl object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCALE SECTION ================= */}
      <section className="relative py-20 sm:py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            {/* IMAGE */}
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <div className="w-full sm:w-[85%] md:w-[88%]">
                <img
                  src="/images/about-3.jpg"
                  alt="Warehouse"
                  className="rounded-2xl object-cover w-full"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="space-y-6 sm:space-y-8 order-1 md:order-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary leading-snug">
                Built to Scale.
                <br className="hidden sm:block" />
                Designed to Endure.
              </h3>

              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-text-body leading-relaxed">
                <p className="text-text-primary">
                  As infrastructure expanded, precision remained constant.
                </p>

                <p>Production evolved. Standards did not.</p>

                <p className="text-text-muted">
                  Growth strengthened discipline — it never replaced it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMITMENT ================= */}
      <section className="relative py-24 sm:py-32 md:py-44 bg-beige-300 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[80px] sm:text-[120px] md:text-[200px] font-semibold text-text-primary opacity-[0.02]">
            REST
          </span>
        </div>

        <div className="relative max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto text-center px-6 md:px-8 space-y-8 sm:space-y-12">
          <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold text-text-primary">
            The Commitment
          </h3>

          <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed">
            We do not manufacture comfort. We construct foundations that support
            life — quietly, consistently, and without compromise.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed">
            Because rest should never feel temporary. It should feel certain.
          </p>
        </div>
      </section>
      {/* ================= WHERE WE ARE ================= */}
      <WhereWeAre />
    </div>
  );
}

function WhereWeAre() {
  return (
    <section className="relative py-24 sm:py-32 md:py-40 bg-white border-t border-beige-500">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-text-soft">
            Where We Are
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary">
            Visit Litmad
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed">
            Experience our craftsmanship in Constantine or explore our showroom
            in Algiers.
          </p>
        </div>

        {/* ================= LOCATIONS GRID ================= */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* ============================================= */}
          {/* CONSTANTINE */}
          {/* ============================================= */}

          <div className="group bg-beige-50 border border-beige-500 rounded-2xl p-8 space-y-8 transition hover:shadow-md">
            {/* Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary-600">
                <FiMapPin size={18} />
                <span className="text-sm font-medium uppercase tracking-wide">
                  Production Facility
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-text-primary">
                Litmad – Constantine
              </h3>

              <p className="text-text-muted text-sm sm:text-base">
                Our operations and manufacturing center.
              </p>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-beige-600">
              <iframe
                src="https://www.google.com/maps?q=36.3388842,6.6484648&hl=fr&z=17&output=embed"
                loading="lazy"
                className="w-full h-[260px] sm:h-[320px]"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=36.3388842,6.6484648"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition"
              >
                <FiNavigation size={16} />
                Guide Me
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=36.3388842,6.6484648"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-beige-600 text-text-primary text-sm font-medium hover:bg-beige-200 transition"
              >
                <FiExternalLink size={16} />
                Open in Maps
              </a>
            </div>
          </div>

          {/* ============================================= */}
          {/* ALGIERS SHOWROOM */}
          {/* ============================================= */}

          <div className="group bg-beige-50 border border-beige-500 rounded-2xl p-8 space-y-8 transition hover:shadow-md">
            {/* Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary-600">
                <FiMapPin size={18} />
                <span className="text-sm font-medium uppercase tracking-wide">
                  Showroom
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-text-primary">
                Litmad Showroom – Algiers
              </h3>

              <p className="text-text-muted text-sm sm:text-base">
                Discover our collections in a refined environment.
              </p>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-beige-600">
              <iframe
                src="https://www.google.com/maps?q=36.7577311,2.9560227&hl=fr&z=17&output=embed"
                loading="lazy"
                className="w-full h-[260px] sm:h-[320px]"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=36.7577311,2.9560227"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition"
              >
                <FiNavigation size={16} />
                Guide Me
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=36.7577311,2.9560227"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-beige-600 text-text-primary text-sm font-medium hover:bg-beige-200 transition"
              >
                <FiExternalLink size={16} />
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
