"use client";

import Link from "next/link";

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

export default function CategoriesSection({ locale = "en" }) {
  return (
    <section className="py-36 bg-[#F9F7F3]">
      <div className="max-w-7xl mx-auto px-8">
        {/* HEADER */}
        <div className="mb-24">
          <h3 className="text-4xl font-semibold tracking-tight">
            Categories We Serve
          </h3>
          <p className="text-[#6A6A6A] mt-4 max-w-lg text-lg">
            Crafted collections designed to elevate every sleep experience.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={`/${locale}/mattresses?category=${cat.slug}`}
              className={`
                group relative h-[420px] rounded-[32px] overflow-hidden
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

              {/* WARM LUXURY OVERLAY */}
              <div
                className="absolute inset-0 bg-gradient-to-t 
                from-black/50 via-black/10 to-transparent 
                group-hover:from-black/60 transition-all duration-500"
              />

              {/* SOFT DEPTH SHADOW */}
              <div className="absolute inset-0 shadow-[0_25px_50px_rgba(0,0,0,0.12)] rounded-[32px]" />

              {/* TEXT */}
              <div className="relative z-10 h-full flex items-end p-10">
                <div>
                  <h4 className="text-2xl font-semibold text-white tracking-wide">
                    {cat.title}
                  </h4>

                  <span
                    className="text-white/80 text-sm mt-2 block opacity-0 
                    group-hover:opacity-100 transition duration-300"
                  >
                    Discover Collection →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
