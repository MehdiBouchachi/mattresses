"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Button from "../ui/Button";

/* ═══════════════════════════════════════════════════════════════════
   IMAGE PATHS
   ═══════════════════════════════════════════════════════════════════ */

const ALL_IMAGES = [
  "/hero/hero1.png",
  "/hero/hero2.png",
  "/hero/hero3.png",
  "/hero/hero4.png",
  "/hero/hero5.png",
  "/hero/hero6.png",
  "/hero/hero7.png",
];

/*
  3 COLUMNS — each column gets images arranged to fill the strip.
  We duplicate them to create an infinite seamless loop.
  Left column  → scrolls UP
  Middle column → scrolls DOWN
  Right column  → scrolls UP
*/

const COL_LEFT = [
  ALL_IMAGES[0],
  ALL_IMAGES[3],
  ALL_IMAGES[6],
  ALL_IMAGES[1],
  ALL_IMAGES[4],
];
const COL_MIDDLE = [
  ALL_IMAGES[1],
  ALL_IMAGES[4],
  ALL_IMAGES[0],
  ALL_IMAGES[5],
  ALL_IMAGES[2],
];
const COL_RIGHT = [
  ALL_IMAGES[2],
  ALL_IMAGES[5],
  ALL_IMAGES[3],
  ALL_IMAGES[6],
  ALL_IMAGES[0],
];

/* ═══════════════════════════════════════════════════════════════════
   INFINITE SCROLL COLUMN
   ═══════════════════════════════════════════════════════════════════ */

function ScrollColumn({
  images,
  direction = "up",
  speed = 30,
  blur = 0,
  className = "",
}) {
  // Double the images for seamless loop
  const doubled = [...images, ...images];
  const isUp = direction === "up";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex flex-col gap-4 sm:gap-5 lg:gap-6"
        animate={{
          y: isUp ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          y: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative w-full aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden flex-shrink-0 bg-slate-800/50"
          >
            <Image
              src={src}
              alt="Premium mattress"
              fill
              className="object-cover object-center"
              style={{
                filter: blur > 0 ? `blur(${blur}px)` : "none",
              }}
              sizes="(max-width:768px) 33vw, 30vw"
              priority={i < 3}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL CUE
   ═══════════════════════════════════════════════════════════════════ */

function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <motion.div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
        <motion.div
          className="w-1 h-1.5 rounded-full bg-white/60"
          animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════ */

export default function HeroSection({ translation }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const sectionRef = useRef(null);

  const { badge, titleLine1, titleHighlight, description, shop, collection } =
    translation?.home?.hero || {};

  // Scroll-driven overlay darkening
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

  // Text stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.13, delayChildren: 0.3 },
    },
  };

  const textReveal = {
    hidden: { opacity: 0, y: 35, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden bg-slate-950"
    >
      {/* ═══════════════════════════════════════════
          BACKGROUND — 3-COLUMN SCROLLING MOSAIC
          ═══════════════════════════════════════════ */}

      <div className="absolute inset-0 z-0">
        <div className="h-full w-full grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 lg:p-5">
          {/* LEFT COLUMN — scrolls UP */}
          <ScrollColumn
            images={COL_LEFT}
            direction="up"
            speed={35}
            blur={0.5}
            className="h-full"
          />

          {/* MIDDLE COLUMN — scrolls DOWN */}
          <ScrollColumn
            images={COL_MIDDLE}
            direction="down"
            speed={40}
            blur={0}
            className="h-full"
          />

          {/* RIGHT COLUMN — scrolls UP */}
          <ScrollColumn
            images={COL_RIGHT}
            direction="up"
            speed={32}
            blur={0.5}
            className="h-full"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          OVERLAYS
          ═══════════════════════════════════════════ */}

      <motion.div
        className="absolute inset-0 z-10"
        style={{ opacity: overlayOpacity }}
      >
        {/* Base dark layer */}
        <div className="absolute inset-0 bg-blue-950/65" />

        {/* Center spotlight — text area is clearest */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.92) 100%)",
          }}
        />
      </motion.div>

      {/* Film grain */}
      <div
        className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ boxShadow: "inset 0 0 220px 80px rgba(0,0,0,0.5)" }}
      />

      {/* Top gradient for navbar breathing room */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent z-10 pointer-events-none" />

      {/* Bottom gradient for clean transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10 pointer-events-none" />

      {/* ═══════════════════════════════════════════
          CONTENT
          ═══════════════════════════════════════════ */}

      <div className="relative z-20 min-h-svh flex flex-col items-center justify-center px-6 sm:px-8 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={textReveal}>
            <span
              className="
                inline-flex items-center gap-2.5
                px-4 py-1.5
                rounded-full
                border border-white/[0.07]
                bg-white/[0.03]
                backdrop-blur-md
                text-[10px] sm:text-[11px]
                text-white/50
                uppercase tracking-[0.3em]
                font-medium
              "
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80" />
              {badge || "Premium Sleep Experience"}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={textReveal}
            className="
              mt-7 sm:mt-8
              font-semibold
              leading-[1.02]
              tracking-[-0.03em]
              text-white
              text-[clamp(34px,8vw,76px)]
            "
          >
            {titleLine1 || "Designed for"}
            <br />
            <span
              className="
                bg-gradient-to-r
                from-white
                via-blue-100
                to-blue-300
                bg-clip-text
                text-transparent
              "
            >
              {titleHighlight || "Deep, Restful Sleep"}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={textReveal}
            className="
              mt-5 sm:mt-6
              text-[14px] sm:text-[16px] lg:text-[17px]
              text-white/40
              max-w-lg
              mx-auto
              leading-relaxed
              font-light
            "
          >
            {description ||
              "Precision-crafted mattresses engineered with breathable layers, adaptive support systems, and refined materials — built to restore your body night after night."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={textReveal}
            className="
              mt-9 sm:mt-11
              flex flex-col sm:flex-row
              justify-center
              gap-3.5 sm:gap-4
              w-full sm:w-auto
            "
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Button
                size="lg"
                className="relative w-full sm:w-auto"
                onClick={() => router.push(`/${locale}/mattresses`)}
              >
                {shop || "Shop Mattresses"}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="secondaryHero"
                size="lg"
                className="w-full sm:w-auto border-white/[0.08] hover:border-white/20 backdrop-blur-sm"
                onClick={() =>
                  document
                    .getElementById("collections")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {collection || "View Collection"}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <ScrollCue />
    </section>
  );
}
