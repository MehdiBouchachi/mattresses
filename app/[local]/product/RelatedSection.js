"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/utils/helpers";

export default function RelatedSection({ currentProduct, allProducts }) {
  const params = useParams();
  const locale = params?.local || "en";
  const isRTL = locale === "ar";

  const [recentlyViewed, setRecentlyViewed] = useState([]);

  /* ================= RELATED LOGIC ================= */

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

    const updated = [
      currentProduct.slug,
      ...stored.filter((slug) => slug !== currentProduct.slug),
    ].slice(0, 5);

    localStorage.setItem("recentlyViewed", JSON.stringify(updated));

    const hydrated = updated
      .slice(1)
      .map((slug) => allProducts.find((p) => p.slug === slug))
      .filter(Boolean);

    setRecentlyViewed(hydrated);
  }, [currentProduct, allProducts]);

  /* ================= REUSABLE SECTION ================= */

  const Section = ({ title, products }) => {
    const scrollRef = useRef(null);

    if (!products.length) return null;

    const scroll = (direction) => {
      const container = scrollRef.current;
      if (!container) return;

      const width = container.offsetWidth;

      const scrollValue = direction === "left" ? -width * 0.8 : width * 0.8;

      container.scrollBy({
        left: isRTL ? -scrollValue : scrollValue,
        behavior: "smooth",
      });
    };

    const showArrows = products.length > 1;

    return (
      <section className="py-16 sm:py-20 lg:py-24 border-t border-blue-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-950 mb-10">
            {title}
          </h2>

          {/* ARROWS */}
          {showArrows && (
            <>
              <button
                onClick={() => scroll("left")}
                className={`
                  hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10
                  ${isRTL ? "-right-5" : "-left-5"}
                  bg-white shadow-md w-10 h-10 rounded-full
                  items-center justify-center
                  border border-blue-100
                  hover:bg-blue-50 transition
                `}
              >
                {isRTL ? "›" : "‹"}
              </button>

              <button
                onClick={() => scroll("right")}
                className={`
                  hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10
                  ${isRTL ? "-left-5" : "-right-5"}
                  bg-white shadow-md w-10 h-10 rounded-full
                  items-center justify-center
                  border border-blue-100
                  hover:bg-blue-50 transition
                `}
              >
                {isRTL ? "‹" : "›"}
              </button>
            </>
          )}

          {/* SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            dir={isRTL ? "rtl" : "ltr"}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-4"
          >
            {products.map((item) => {
              const image = item.images?.[0] ?? item.image;

              const basePrice = item.basePrice ?? item.price ?? 0;

              const discount = item.discount ?? 0;
              const hasDiscount = discount > 0;

              const finalPrice = hasDiscount
                ? Math.round(basePrice * (1 - discount / 100))
                : basePrice;

              return (
                <motion.div
                  key={item.slug}
                  whileHover={{ y: -6 }}
                  className="
                    snap-start min-w-[240px] sm:min-w-[280px] lg:min-w-[300px]
                    bg-white rounded-3xl
                    border border-blue-100
                    shadow-sm hover:shadow-lg
                    transition
                  "
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden rounded-t-3xl relative">
                    <img
                      src={image}
                      alt={item.name}
                      className="w-full h-[220px] object-cover transition duration-500 hover:scale-105"
                    />

                    {hasDiscount && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        -{discount}%
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                      {item.category}
                    </p>

                    <h3 className="text-sm sm:text-base font-semibold text-blue-950 mb-3 line-clamp-2">
                      {item.name}
                    </h3>

                    <div className="mb-4">
                      {hasDiscount ? (
                        <>
                          <p className="text-blue-900 font-bold text-base">
                            {formatPrice(finalPrice, locale)}
                          </p>
                          <p className="text-xs text-slate-400 line-through">
                            {formatPrice(basePrice,locale)}
                          </p>
                        </>
                      ) : (
                        <p className="text-blue-900 font-bold text-base">
                          {formatPrice(basePrice,locale)}
                        </p>
                      )}
                    </div>

                    <Link href={`/${locale}/product/${item.slug}`}>
                      <Button size="sm" className="w-full ">
                        {locale === "ar" ? "عرض المنتج" : "View Product"}
                      </Button>
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
      <Section
        title={locale === "ar" ? "منتجات ذات صلة" : "Related Products"}
        products={related}
      />
      <Section
        title={
          locale === "ar" ? "العملاء اشتروا أيضاً" : "Customers Also Bought"
        }
        products={alsoBought}
      />
      <Section
        title={locale === "ar" ? "شوهد مؤخراً" : "Recently Viewed"}
        products={recentlyViewed}
      />
    </>
  );
}
