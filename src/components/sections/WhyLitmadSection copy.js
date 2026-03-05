"use client";
import { FiActivity, FiLayers, FiWind, FiMoon } from "react-icons/fi";

/*  HEADLINE  */

function HeadlineBlock({ title, desc }) {
  return (
    <div className="text-center mb-12 sm:mb-16 lg:mb-24 px-2">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-4 sm:mb-6 text-blue-950">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-slate-600 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

/*  STATEMENTS  */

function StatementsBlock({ statements, locale }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {statements.map(({ title, desc }, i) => (
        <div
          key={i}
          className={
            locale === "ar"
              ? "border-r-4 border-blue-800 pr-4 sm:pr-6"
              : "border-l-4 border-blue-800 pl-4 sm:pl-6"
          }
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-blue-950">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
}

/*  BENEFITS  */

function BenefitsGrid({ benefits }) {
  const icons = [FiActivity, FiLayers, FiWind, FiMoon];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20 lg:mb-28">
      {benefits.map((title, i) => {
        const Icon = icons[i];

        return (
          <div
            key={i}
            className="group bg-white rounded-3xl p-6 sm:p-8 
            border border-blue-100
            shadow-sm hover:shadow-lg
            transition duration-500
            flex flex-col items-center text-center"
          >
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 rounded-full
              bg-blue-600/10 
              flex items-center justify-center
              text-blue-800 text-lg sm:text-xl
              group-hover:bg-blue-800
              group-hover:text-white
              transition duration-500"
            >
              <Icon />
            </div>

            <h4 className="text-base sm:text-lg font-semibold text-blue-950">
              {title}
            </h4>
          </div>
        );
      })}
    </div>
  );
}

/*  TRUST STRIP  */

function TrustStrip({ trust }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 text-center border-t border-blue-100 pt-8 sm:pt-10 gap-8 sm:gap-0">
      {trust.map(({ value, label }, i) => (
        <div key={i}>
          <p className="text-2xl sm:text-3xl font-semibold text-blue-950">
            {value}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

/*  MAIN SECTION  */

export default function WhyLitmadSection({ translation, locale }) {
  const { title, desc, statements, benefits, trust } =
    translation.home.whyLitmad;

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-white overflow-hidden">
      {/* Soft Blue Background Blobs */}
      <div className="hidden lg:block absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[160px] opacity-15" />
      <div className="hidden lg:block absolute bottom-0 -left-40 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[180px] opacity-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <HeadlineBlock title={title} desc={desc} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-24 items-center mb-16 sm:mb-20 lg:mb-28">
          {/* IMAGE */}
          <div
            className="relative rounded-[40px] overflow-hidden 
            shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          >
            <img
              src="/images/mattresses.png"
              alt="LITMAD Mattress"
              className="w-full h-72 sm:h-96 lg:h-[520px] object-cover"
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
