import Link from "next/link";

/* ================= CATEGORY CARD ================= */

function CategoryCard({ cat, locale, discover, index }) {
  return (
    <Link
      href={`/${locale}/mattresses?category=${cat.slug}`}
      className={`
        group relative h-105 rounded-4xl overflow-hidden
        transition-all duration-500
        ${index === 1 || index === 3 ? "lg:translate-y-10" : ""}
      `}
    >
      {/* IMAGE */}
      <img
        src={cat.image}
        alt={cat.title}
        className="absolute inset-0 w-full h-full object-cover
        transition-transform duration-[1200ms] ease-out
        group-hover:scale-110"
      />

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-gradient-to-t 
        from-black/50 via-black/10 to-transparent 
        group-hover:from-black/60 transition-all duration-500"
      />

      {/* SHADOW */}
      <div className="absolute inset-0 shadow-[0_25px_50px_rgba(0,0,0,0.12)] rounded-[32px]" />

      {/* TEXT */}
      <div className="relative z-10 h-full flex items-end p-10">
        <div>
          <h4 className="text-2xl font-semibold text-primary-50 tracking-wide">
            {cat.title}
          </h4>

          <span
            className="text-primary-50/80 text-sm mt-2 block opacity-0 
  group-hover:opacity-100 transition duration-300"
          >
            {locale === "ar" ? discover + " ←" : discover + " →"}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ================= MAIN SECTION ================= */

const categories = [
  { title: "Foam", image: "/images/mattresses.png", slug: "foam" },
  { title: "Spring", image: "/images/mattresses.png", slug: "spring" },
  { title: "Hybrid", image: "/images/mattresses.png", slug: "hybrid" },
  {
    title: "Accessories",
    image: "/images/mattresses.png",
    slug: "accessories",
  },
];

export default function CategoriesSection({ locale = "en", translation }) {
  const { title, desc, discover } = translation.home.categories;

  return (
    <section className="py-30 bg-gradient-to-b from-beige-50 to-beige-150">
      <div className="max-w-7xl mx-auto px-8">
        {/* HEADER */}
        <div className="mb-24">
          <h3 className="text-4xl font-semibold tracking-tight">{title}</h3>
          <p className="text-text-body mt-4 max-w-lg">{desc}</p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
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
