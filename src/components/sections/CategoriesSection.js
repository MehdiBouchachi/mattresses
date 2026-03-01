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
        h-64 sm:h-72 lg:h-[420px]
        rounded-3xl
        overflow-hidden
        transition-all duration-500
        ${index % 2 !== 0 ? "lg:translate-y-10" : ""}
      `}
    >
      {/* IMAGE */}
      <img
        src="/images/mattresses.png"
        alt={title}
        className="absolute inset-0 w-full h-full object-cover
        transition-transform duration-[1200ms] ease-out
        group-hover:scale-110"
      />

      {/* BLUE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/30 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-end p-6 sm:p-8 lg:p-10">
        <div>
          <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white tracking-wide">
            {title}
          </h4>

          <span
            className="text-white/80 text-xs sm:text-sm mt-2 block opacity-0 
            group-hover:opacity-100 transition duration-300"
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
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* HEADER */}
        <div className="mb-12 sm:mb-16 lg:mb-24 text-center lg:text-start">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-blue-950">
            {title}
          </h3>

          <p className="text-slate-600 mt-3 sm:mt-4 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
            {desc}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-14">
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
