"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─── DATA ─── */
const HOMEPAGE_CATEGORIES = [
  {
    id: "mattresses",
    translations: { en: "Mattresses", fr: "Matelas", ar: "مراتب" },
    href: (locale) => `/${locale}/mattresses`,
    image: "/images/mattresses.png",
  },
  {
    id: "toppers",
    translations: {
      en: "Mattress Toppers",
      fr: "Sur-Matelas",
      ar: "أغطية المراتب",
    },
    href: (locale) => `/${locale}/mattresses?category=sur-matelas`,
    image: "/images/mattresses.png",
  },
  {
    id: "pillows",
    translations: { en: "Pillows", fr: "Oreillers", ar: "وسائد" },
    href: (locale) => `/${locale}/mattresses?category=oreiller`,
    image: "/images/mattresses.png",
  },
];

/* ─── 3D TILT CARD ─── */
function CategoryCard({ cat, locale, discover, index }) {
  const title = cat.translations[locale] || cat.translations.en;
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  /* mouse tracking for tilt */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative will-change-transform"
      >
        <Link
          href={cat.href(locale)}
          className="group relative block h-56 sm:h-64 lg:h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
        >
          {/* IMAGE with zoom */}
          <motion.img
            src={cat.image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          />

          {/* SHIMMER OVERLAY */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={
              isHovered ? { backgroundPosition: ["-200% 0%", "200% 0%"] } : {}
            }
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* INNER DEPTH SHADOW */}
          <div className="absolute inset-0 shadow-[inset_0_-120px_120px_rgba(0,0,0,0.65)] lg:shadow-[inset_0_-160px_160px_rgba(0,0,0,0.7)] z-10" />

          {/* BLUE GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-900/30 to-transparent z-10" />

          {/* GLOW on hover */}
          <motion.div
            className="absolute -inset-[1px] rounded-3xl z-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.15), transparent 60%)",
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* CONTENT */}
          <div className="relative z-20 h-full flex items-end p-5 sm:p-6 lg:p-10">
            <motion.div
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="text-base sm:text-lg lg:text-2xl font-semibold text-white tracking-wide">
                {title}
              </h4>

              <motion.span
                className="text-white/85 text-xs sm:text-sm mt-1 sm:mt-2 block"
                initial={{ opacity: 0.9 }}
                animate={{
                  opacity: isHovered ? 1 : 0.9,
                  y: isHovered ? 0 : 4,
                }}
                transition={{ duration: 0.3 }}
              >
                {locale === "ar" ? `← ${discover}` : `${discover} →`}
              </motion.span>
            </motion.div>
          </div>
        </Link>

        {/* FLOATING SHADOW */}
        <motion.div
          className="absolute -bottom-4 left-[10%] right-[10%] h-8 rounded-full bg-black/20 blur-xl -z-10"
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN SECTION ─── */
export default function CategoriesSection({ locale = "en", translation }) {
  const { title, desc, discover } = translation.home.categories;
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* HEADER */}
        <motion.div
          ref={headerRef}
          className="mb-12 sm:mb-16 lg:mb-24 text-center lg:text-start"
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

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {HOMEPAGE_CATEGORIES.map((cat, index) => (
            <CategoryCard
              key={cat.id}
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
