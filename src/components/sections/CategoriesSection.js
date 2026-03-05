import { categories } from "@/constants/products";
import Link from "next/link";

/* ================= CATEGORY CARD ================= */

function CategoryCard({ cat, locale, discover, index }) {
  const title = cat.translations[locale] || cat.translations.en;

  return (
    <Link
      href={`/${locale}/mattresses?category=${cat.value}`}
      className={`
        group relative
        h-56 sm:h-64 lg:h-[420px]
        rounded-3xl
        overflow-hidden
        transition-all duration-500
        shadow-sm hover:shadow-xl
        active:scale-[0.98]
        ${index % 2 !== 0 ? "lg:translate-y-10" : ""}
      `}
    >
      {/* IMAGE */}
      <img
        src="/images/mattresses.png"
        alt={title}
        className="
          absolute inset-0
          w-full h-full object-cover
          transition-transform duration-[1200ms] ease-out
          group-hover:scale-110
        "
      />

      {/* INNER SHADOW (gives depth) */}
      <div className="absolute inset-0 shadow-[inset_0_-120px_120px_rgba(0,0,0,0.65)] lg:shadow-[inset_0_-160px_160px_rgba(0,0,0,0.7)]" />

      {/* BLUE GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-900/30 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-end p-5 sm:p-6 lg:p-10">
        <div>
          <h4
            className="
              text-base
              sm:text-lg
              lg:text-2xl
              font-semibold
              text-white
              tracking-wide
            "
          >
            {title}
          </h4>

          <span
            className="
              text-white/85
              text-xs sm:text-sm
              mt-1 sm:mt-2
              block
              opacity-90
              lg:opacity-0
              lg:group-hover:opacity-100
              transition duration-300
            "
          >
            {locale === "ar" ? `← ${discover}` : `${discover} →`}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ================= MAIN SECTION ================= */

export default function CategoriesSection({ locale = "en", translation }) {
  const { title, desc, discover } = translation.home.categories;

  return (
    <section className="py-14 sm:py-18 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* HEADER */}

        <div className="mb-10 sm:mb-14 lg:mb-24 text-center lg:text-start">
          <h3
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              tracking-tight
              text-blue-950
            "
          >
            {title}
          </h3>

          <p
            className="
              text-slate-600
              mt-3
              sm:mt-4
              max-w-md
              mx-auto
              lg:mx-0
              text-sm
              sm:text-base
              leading-relaxed
            "
          >
            {desc}
          </p>
        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-14">
          {categories.map((cat, index) => (
            <CategoryCard
              key={cat.value}
              cat={cat}
              locale={locale}
              discover={discover}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
