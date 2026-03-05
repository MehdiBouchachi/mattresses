"use client";

import Image from "next/image";
import { FiActivity, FiLayers, FiWind, FiMoon } from "react-icons/fi";

/* HEADLINE */

function HeadlineBlock({ title, desc }) {
  return (
    <div className="text-center mb-10 sm:mb-14 lg:mb-20 px-2">
      <h2
        className="font-display    text-2xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              tracking-tight text-blue-950 mb-4"
      >
        {title}
      </h2>

      <p
        className="
             text-sm sm:text-base text-slate-600 max-w-xl sm:max-w-2xl mx-auto leading-relaxed
            "
      >
        {desc}
      </p>
    </div>
  );
}

/* STATEMENTS */

function StatementsBlock({ statements, locale }) {
  return (
    <div className="space-y-6 sm:space-y-7">
      {statements.map(({ title, desc }, i) => (
        <div
          key={i}
          className={
            locale === "ar"
              ? "md:border-r-3 border-r-2  border-blue-800 pr-4 sm:pr-6 "
              : "md:border-l-3 border-l-2 border-blue-800 pl-4 sm:pl-6 "
          }
        >
          <h3 className="font-display text-md sm:text-lg font-semibold text-blue-950 mb-2">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
}

/* BENEFITS */

function BenefitsGrid({ benefits }) {
  const icons = [FiActivity, FiLayers, FiWind, FiMoon];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-14 sm:mb-16 lg:mb-24">
      {benefits.map((title, i) => {
        const Icon = icons[i];

        return (
          <div
            key={title}
            className="group bg-white rounded-3xl p-6 border border-blue-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 mb-4 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-800 text-xl group-hover:bg-blue-900 group-hover:text-white transition duration-300">
              <Icon />
            </div>

            <h4 className="font-display text-md sm:text-lg font-semibold text-blue-950">
              {title}
            </h4>
          </div>
        );
      })}
    </div>
  );
}

/* TRUST STRIP */

function TrustStrip({ trust }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 text-center border-t border-blue-100 pt-8 gap-8 sm:gap-0">
      {trust.map(({ value, label }, i) => (
        <div key={i}>
          <p className="font-display text-2xl sm:text-3xl font-semibold text-blue-950">
            {value}
          </p>

          <p className="text-xs text-slate-500 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}

/* MAIN SECTION */

export default function WhyLitmadSection({ translation, locale }) {
  const { title, desc, statements, benefits, trust } =
    translation.home.whyLitmad;

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      {/* decorative blobs */}

      <div className="hidden lg:block absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[160px] opacity-15" />
      <div className="hidden lg:block absolute bottom-0 -left-40 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[180px] opacity-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <HeadlineBlock title={title} desc={desc} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center mb-14 sm:mb-16 lg:mb-24">
          {/* IMAGE */}

          <div className="group relative rounded-[36px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] h-72 sm:h-96 lg:h-[520px]">
            <Image
              src="/images/mattresses.png"
              alt="Empreinte Flex Mattress"
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 520px"
              priority
              className="object-cover transition duration-[2000ms] group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/10 via-transparent to-transparent" />
          </div>

          <StatementsBlock statements={statements} locale={locale} />
        </div>

        <BenefitsGrid benefits={benefits} />

        <TrustStrip trust={trust} />
      </div>
    </section>
  );
}
