"use client";

export default function AboutPage() {
  return (
    <div className="bg-beige-100 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-center px-8">
        {/* Subtle ghost branding */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[160px] md:text-[220px] font-semibold text-text-primary opacity-[0.03] tracking-tight">
            LITMAD
          </span>
        </div>

        <div className="relative max-w-3xl">
          <p className="text-xs uppercase tracking-[0.5em] text-text-soft mb-6">
            Our Philosophy
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary leading-tight">
            Comfort Is Structured Silence.
          </h1>

          <p className="mt-8 text-text-muted text-lg leading-relaxed">
            It is the invisible architecture that supports the body — night
            after night.
          </p>
        </div>
      </section>

      {/* ================= FULL BLEED FRAME ================= */}
      <section className="relative h-[90vh]">
        <img
          src="/images/about-1.jpg"
          alt="Craft process"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Controlled dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/10" />

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center text-white max-w-2xl px-6">
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
            Every Layer Carries Intention.
          </h2>

          <p className="mt-6 text-base md:text-lg opacity-90 leading-relaxed">
            What feels effortless is shaped through calibration, discipline, and
            repetition.
          </p>
        </div>
      </section>

      {/* ================= EDITORIAL BLOCK ================= */}
      <section className="max-w-6xl mx-auto px-8 py-40">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* TEXT */}
          <div className="space-y-8 max-w-xl">
            <h3 className="text-3xl font-semibold text-text-primary leading-snug">
              Engineering Beyond Surface Softness
            </h3>

            <p className="text-text-primary text-lg leading-relaxed">
              Softness is immediate. Structure is lasting.
            </p>

            <p className="text-text-body leading-relaxed">
              Our mattresses are engineered to maintain alignment, distribute
              pressure evenly, and regulate airflow — without losing integrity
              over time.
            </p>

            <p className="text-text-muted leading-relaxed">
              Comfort is not padding. It is layered architecture.
            </p>
          </div>

          {/* IMAGE */}
          <div className="flex justify-end">
            <div className="w-[90%]">
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
      <section className="relative py-40 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-20 items-center">
            {/* IMAGE */}
            <div className="md:col-span-6 flex justify-start">
              <div className="w-[88%]">
                <img
                  src="/images/about-3.jpg"
                  alt="Warehouse"
                  className="rounded-[24px] object-cover w-full"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="md:col-span-6 space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-text-primary leading-snug">
                  Built to Scale.
                  <br />
                  Designed to Endure.
                </h3>

                <div className="h-[1px] w-16 bg-beige-500" />
              </div>

              <div className="space-y-6 text-text-body leading-relaxed text-lg">
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

      <section className="relative py-44 bg-beige-300 overflow-hidden">
        {/* Subtle background texture layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-beige-300 via-beige-200 to-beige-300 opacity-60" />

        {/* Ghost typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[140px] md:text-[220px] font-semibold tracking-tight text-text-primary opacity-[0.02]">
            REST
          </span>
        </div>

        <div className="relative max-w-3xl mx-auto text-center px-8 space-y-12">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-semibold text-text-primary leading-snug">
              The Commitment
            </h3>

            <div className="h-[1px] w-16 bg-beige-500 mx-auto" />
          </div>

          <div className="space-y-8 text-lg leading-relaxed text-text-muted">
            <p className="text-text-primary">We do not manufacture comfort.</p>

            <p>
              We construct foundations that support life — quietly,
              consistently, and without compromise.
            </p>

            <p className="text-text-muted">
              Because rest should never feel temporary. It should feel certain.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
