"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price || 0) + " DA";

export default function RelatedSection({ currentProduct, allProducts }) {
  const params = useParams();
  const locale = params?.local || "en";
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  /* ================= RELATED ================= */
  const related = allProducts.filter(
    (p) =>
      p.slug !== currentProduct.slug && p.category === currentProduct.category,
  );

  const alsoBought = allProducts.filter(
    (p) =>
      p.slug !== currentProduct.slug &&
      p.subcategory === currentProduct.subcategory,
  );

  /* ================= RECENTLY VIEWED ================= */
  useEffect(() => {
    if (!currentProduct?.slug) return;

    const stored = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    const updatedSlugs = [
      currentProduct.slug,
      ...stored.filter((slug) => slug !== currentProduct.slug),
    ].slice(0, 5);

    localStorage.setItem("recentlyViewed", JSON.stringify(updatedSlugs));

    const hydrated = updatedSlugs
      .slice(1)
      .map((slug) => allProducts.find((p) => p.slug === slug))
      .filter(Boolean);

    setRecentlyViewed(hydrated);
  }, [currentProduct, allProducts]);

  /* ================= SECTION ================= */
  const Section = ({ title, products }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
      const container = scrollRef.current;
      if (!container) return;
      const width = container.offsetWidth;
      container.scrollBy({
        left: direction === "left" ? -width : width,
        behavior: "smooth",
      });
    };

    if (!products.length) return null;

    return (
      <section className="py-24 border-t border-[#E9E2D8] relative">
        <div className="max-w-7xl mx-auto px-8 relative">
          <h2 className="text-4xl font-semibold mb-14">{title}</h2>

          {/* ARROWS */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center border border-[#E9E2D8]"
          >
            ‹
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center border border-[#E9E2D8]"
          >
            ›
          </button>

          {/* SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-6"
          >
            {products.map((item) => {
              const image = item.images?.[0] ?? item.image;

              const basePrice = item.basePrice ?? item.price ?? 0;

              const oldPrice = item.oldPrice ?? null;
              const discount = item.discount ?? 0;

              const hasDiscount = discount > 0 && oldPrice;

              const finalPrice = hasDiscount
                ? Math.round(basePrice * (1 - discount / 100))
                : basePrice;

              return (
                <motion.div
                  key={item.slug}
                  whileHover={{ y: -6 }}
                  className="snap-start min-w-[300px] bg-white rounded-[28px] border border-[#E9E2D8] shadow-sm hover:shadow-lg transition"
                >
                  <div className="overflow-hidden rounded-t-[28px] relative">
                    <img
                      src={image}
                      alt={item.name}
                      className="w-full h-[240px] object-cover transition duration-500 hover:scale-105"
                    />

                    {hasDiscount && (
                      <div className="absolute top-4 right-4 bg-[#2B2D6E] text-white text-xs px-3 py-1 rounded-full">
                        -{discount}%
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-xs uppercase tracking-widest text-[#9A8F82] mb-2">
                      {item.category}
                    </p>

                    <h3 className="text-lg font-semibold mb-4">{item.name}</h3>

                    {hasDiscount ? (
                      <>
                        <p className="text-[#2B2D6E] font-bold text-lg">
                          {formatPrice(finalPrice)}
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          {formatPrice(oldPrice)}
                        </p>
                      </>
                    ) : (
                      <p className="text-[#2B2D6E] font-bold text-lg">
                        {formatPrice(basePrice)}
                      </p>
                    )}

                    <Link href={`/${locale}/product/${item.slug}`}>
                      <button className="mt-6 w-full border border-[#2B2D6E] text-[#2B2D6E] py-2 rounded-full hover:bg-[#2B2D6E] hover:text-white transition">
                        View Product
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Section title="Related Products" products={related} />
      <Section title="Customers Also Bought" products={alsoBought} />
      <Section title="Recently Viewed" products={recentlyViewed} />
    </>
  );
}
