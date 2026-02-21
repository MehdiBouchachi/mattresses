"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function RelatedSection({ currentProduct, allProducts }) {
  const scrollRef = useRef(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  /* ================= RELATED ================= */
  const related = allProducts.filter(
    (p) =>
      p.slug !== currentProduct.slug && p.category === currentProduct.category,
  );

  /* ================= ALSO BOUGHT (Mock Logic) ================= */
  const alsoBought = allProducts.filter(
    (p) =>
      p.slug !== currentProduct.slug &&
      p.subcategory === currentProduct.subcategory,
  );

  /* ================= RECENTLY VIEWED ================= */
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    const updated = [
      currentProduct,
      ...viewed.filter((p) => p.slug !== currentProduct.slug),
    ].slice(0, 5);

    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    setRecentlyViewed(updated.slice(1));
  }, [currentProduct]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* ================= DRAG SCROLL ================= */
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => (isDown = false);
  const handleMouseUp = () => (isDown = false);

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const Section = ({ title, products }) => (
    <section className="py-28 border-t border-[#E9E2D8]">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-semibold mb-16">{title}</h2>

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-10 overflow-x-auto scrollbar-hide cursor-grab"
        >
          {products.map((item) => (
            <motion.div
              key={item.slug}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="min-w-[320px] bg-white rounded-[32px] border border-[#E9E2D8] shadow-sm hover:shadow-lg transition"
            >
              <div className="overflow-hidden rounded-t-[32px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[260px] object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-8">
                <p className="text-xs uppercase tracking-widest text-[#9A8F82] mb-2">
                  {item.category}
                </p>

                <h3 className="text-xl font-semibold mb-4">{item.name}</h3>

                <p className="text-[#2B2D6E] font-bold text-lg mb-6">
                  {formatPrice(item.price)}
                </p>

                <button className="w-full border border-[#2B2D6E] text-[#2B2D6E] py-3 rounded-full hover:bg-[#2B2D6E] hover:text-white transition">
                  View Product
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Section title="Related Products" products={related} />
      <Section title="Customers Also Bought" products={alsoBought} />

      {recentlyViewed.length > 0 && (
        <Section title="Recently Viewed" products={recentlyViewed} />
      )}
    </>
  );
}
