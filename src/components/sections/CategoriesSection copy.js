"use client";

import Link from "next/link";

const categories = [
  {
    title: "Foam",
    description: "Pressure-relief comfort with adaptive support.",
    image: "/images/mattresses.png",
    slug: "foam",
  },
  {
    title: "Spring",
    description: "Traditional bounce with balanced firmness.",
    image: "/images/mattresses.png",
    slug: "spring",
  },
  {
    title: "Hybrid",
    description: "Perfect harmony of foam and coils.",
    image: "/images/mattresses.png",
    slug: "hybrid",
  },
  {
    title: "Accessories",
    description: "Premium pillows and sleep essentials.",
    image: "/images/mattresses.png",
    slug: "accessories",
  },
];

export default function CategoriesSection({ locale = "en" }) {
  return (
    <section className="py-32 bg-[#F9F7F3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* ===== HEADER (Aligned with Products Section) ===== */}
        <div className="mb-20">
          <h3 className="text-4xl font-semibold">Categories We Serve</h3>
          <p className="text-[#6A6A6A] mt-3 max-w-xl">
            Thoughtfully designed collections crafted for every sleep
            preference.
          </p>
        </div>

        {/* ===== ANGLED GRID LAYOUT ===== */}
        <div className="grid md:grid-cols-2 gap-12">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={`/${locale}/mattresses?category=${cat.slug}`}
              className={`
                group relative h-[420px] rounded-[32px] overflow-hidden
                shadow-sm hover:shadow-2xl transition-all duration-700
                ${index % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"}
              `}
            >
              {/* IMAGE */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover
                group-hover:scale-110 transition duration-1000"
              />

              {/* DARK GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* ANGLED ACCENT SHAPE */}
              <div
                className="absolute -bottom-16 -right-16 w-64 h-64 
                bg-[#2B2D6E] rotate-45 opacity-20 
                group-hover:opacity-40 transition duration-500"
              />

              {/* CONTENT */}
              <div className="relative z-10 h-full flex flex-col justify-end p-10 text-white">
                <h4 className="text-3xl font-semibold mb-3">{cat.title}</h4>

                <p className="text-white/80 text-base mb-6 max-w-sm">
                  {cat.description}
                </p>

                <span
                  className="text-sm tracking-wide uppercase font-medium
                  group-hover:translate-x-2 transition duration-300 inline-block"
                >
                  Explore Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
