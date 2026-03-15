"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";
import ProductCard from "../features/products/ProductCard";

/* ─── PRODUCT CARD WRAPPER ─── */
function LuxuryProductCard({ product, translation, locale, index, isFirst }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={cardRef}
      className={isFirst ? "sm:col-span-2 lg:col-span-1" : ""}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <motion.div
        className="group relative"
        whileHover={{
          y: -8,
          transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
        }}
      >
        {/* SPOTLIGHT EFFECT */}
        <motion.div
          className="absolute -inset-4 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.04), transparent 60%)",
          }}
        />

        <ProductCard
          product={product}
          translation={translation}
          locale={locale}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── SERVER-FETCHED WRAPPER ─── */
/* 
   NOTE: Since ProductsSection fetches data server-side, we create a client wrapper.
   The parent should fetch data and pass products as props.
*/

export default function ProductsSectionClient({
  translation,
  locale,
  enhancedProducts,
}) {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });

  const {
    title,
    desc,
    viewAll,
    productCard: productCardTranslation,
  } = translation.home.products;

  return (
    <section
      className="relative py-20 sm:py-24 lg:py-36 bg-white overflow-hidden"
      id="collections"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50 rounded-full blur-[200px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* HEADER */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14 sm:mb-18 lg:mb-28"
        >
          <motion.div
            className="text-center sm:text-start max-w-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-blue-950">
              {title}
            </h3>
            <p className="text-slate-600 mt-3 sm:mt-4 max-w-md mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed">
              {desc}
            </p>
          </motion.div>

          <motion.div
            className="w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              href={`/${locale}/mattresses`}
              variant="secondary"
              size="md"
              fullWidth
              className="sm:w-auto"
            >
              {viewAll}
            </Button>
          </motion.div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-14">
          {enhancedProducts?.map((product, index) => (
            <LuxuryProductCard
              key={product.id}
              product={product}
              translation={productCardTranslation}
              locale={locale}
              index={index}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* 
   ─── SERVER COMPONENT WRAPPER ─── 
   Keep this for data fetching, renders the client component above
*/
import { getProductsWithDetails } from "@/lib/data-services/products";

export async function ProductsSection({ translation, locale }) {
  const products = await getProductsWithDetails({ featured: true });
  const featuredProducts = products.slice(0, 3);

  const enhancedProducts = featuredProducts.map((p) => {
    const allPrices =
      p.details?.dimensions?.flatMap((d) => d.options?.map((o) => o.price)) ||
      [];
    if (allPrices.length === 0) return p;
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    return { ...p, priceRange: { min, max } };
  });

  return (
    <ProductsSectionClient
      translation={translation}
      locale={locale}
      enhancedProducts={enhancedProducts}
    />
  );
}
