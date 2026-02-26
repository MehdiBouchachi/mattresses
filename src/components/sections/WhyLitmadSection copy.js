import { FiActivity, FiLayers, FiWind, FiMoon } from "react-icons/fi";

/* ================= HEADLINE ================= */

function HeadlineBlock({ title, desc }) {
  return (
    <div className="text-center mb-24">
      <h2 className="text-4xl font-semibold tracking-tight mb-6">{title}</h2>
      <p className="text-text-body max-w-2xl mx-auto leading-relaxed">{desc}</p>
    </div>
  );
}

/* ================= STATEMENTS ================= */

function StatementsBlock({ statements, locale }) {
  return (
    <div className="space-y-8">
      {statements.map(({ title, desc }, i) => (
        <div
          key={i}
          className={
            "" +
            (locale === "ar"
              ? "rtl:border-r-4 rtl:border-primary-600 rtl:pl-0 rtl:pr-6"
              : "border-l-4 border-primary-600 pl-6 ")
          }
        >
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-text-body leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ================= BENEFITS ================= */

function BenefitsGrid({ benefits }) {
  const icons = [FiActivity, FiLayers, FiWind, FiMoon];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-28">
      {benefits.map((title, i) => {
        const Icon = icons[i];

        return (
          <div
            key={i}
            className="group bg-beige-50 rounded-3xl p-8 
            border border-beige-600
            shadow-[0_15px_40px_rgba(0,0,0,0.04)]
            hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
            transition duration-500
            flex flex-col items-center text-center"
          >
            <div
              className="w-14 h-14 mb-6 rounded-full
              bg-primary-600/10 
              flex items-center justify-center
              text-primary-600 text-xl
              group-hover:bg-primary-600
              group-hover:text-primary-50
              transition duration-500"
            >
              <Icon />
            </div>

            <h4 className="text-lg font-semibold">{title}</h4>
          </div>
        );
      })}
    </div>
  );
}

/* ================= TRUST STRIP ================= */

function TrustStrip({ trust }) {
  return (
    <div className="grid grid-cols-3 text-center border-t border-beige-650 pt-10">
      {trust.map(({ value, label }, i) => (
        <div key={i}>
          <p className="text-3xl font-semibold">{value}</p>
          <p className="text-sm text-text-body mt-2">{label}</p>
        </div>
      ))}
    </div>
  );
}

/* ================= MAIN SECTION ================= */

export default function WhyLitmadSection({ translation, locale }) {
  const { title, desc, statements, benefits, trust } =
    translation.home.whyLitmad;

  return (
    <section className="relative py-30 bg-gradient-to-b from-beige-50 via-beige-150 to-beige-200 overflow-hidden">
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] 
bg-primary-200 rounded-full blur-[140px] opacity-20"
      />

      <div
        className="absolute bottom-0 -left-40 w-[600px] h-[600px] 
bg-primary-100 rounded-full blur-[160px] opacity-15"
      />
      <div className="max-w-7xl mx-auto px-8">
        <HeadlineBlock title={title} desc={desc} />

        <div className="grid lg:grid-cols-2 gap-24 items-center mb-28">
          {/* IMAGE */}
          <div
            className="relative rounded-[40px] overflow-hidden 
            shadow-[0_40px_80px_rgba(0,0,0,0.08)]"
          >
            <img
              src="/images/mattresses.png"
              alt="LITMAD Mattress"
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
          </div>

          <StatementsBlock statements={statements} locale={locale} />
        </div>

        <BenefitsGrid benefits={benefits} />

        <TrustStrip trust={trust} />
      </div>
    </section>
  );
}
