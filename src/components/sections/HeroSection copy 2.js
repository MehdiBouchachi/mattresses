"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Button from "../ui/Button";

/* ─── FLOATING PARTICLES ─── */
function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      xAnimOffset: Math.random() * 40 - 20, // precompute x animation offset
    })),
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.xAnimOffset, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── SCROLL INDICATOR ─── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <span className="text-white/50 text-[10px] uppercase tracking-[0.3em]">
        Scroll
      </span>
      <motion.div
        className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent"
        animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ─── ANIMATED GRADIENT ORB ─── */
function GradientOrb() {
  return (
    <motion.div
      className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-[1] pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── HERO SECTION ─── */
export default function HeroSection({ translation }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const sectionRef = useRef(null);

  const { badge, titleLine1, titleHighlight, description, shop, collection } =
    translation?.home?.hero || {};

  /* parallax scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.9]);

  /* text animation variants */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const textReveal = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex items-center justify-center overflow-hidden text-white"
    >
      {/* PARALLAX BACKGROUND */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src="/images/mattresses.png"
          alt="Luxury Mattress"
          fill
          priority
          className="object-cover object-center md:object-[center_60%]"
          sizes="100vw"
        />
      </motion.div>

      {/* VIGNETTE OVERLAY */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* CINEMATIC GRADIENT */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 z-[1]"
        style={{ opacity: overlayOpacity }}
      />

      {/* ANIMATED GRADIENT ORB */}
      <GradientOrb />

      {/* PARTICLES */}
      <Particles />

      {/* CONTENT */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-28 flex flex-col justify-center items-center text-center"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.p
          variants={textReveal}
          className="uppercase tracking-[0.35em] text-[10px] sm:text-[11px] text-white/60 mb-5 font-medium border border-white/10 px-5 py-2 rounded-full backdrop-blur-sm"
        >
          {badge}
        </motion.p>

        {/* Title */}
        <motion.h1
          variants={textReveal}
          className="font-semibold leading-[1.05] tracking-tight mb-7 text-[clamp(32px,7vw,68px)] drop-shadow-2xl"
        >
          {titleLine1}
          <br />
          <span className="bg-gradient-to-r from-white via-white/90 to-blue-200 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={textReveal}
          className="text-[15px] md:text-[17px] text-white/70 max-w-lg mx-auto leading-relaxed mb-12"
        >
          {description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={buttonVariants}
          className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative group"
          >
            {/* Button glow */}
            <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Button
              size="lg"
              className="relative w-full sm:w-auto"
              onClick={() => router.push(`/${locale}/mattresses`)}
            >
              {shop}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="secondaryHero"
              size="lg"
              className="w-full sm:w-auto backdrop-blur-sm"
              onClick={() =>
                document
                  .getElementById("collections")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {collection}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <ScrollIndicator />
    </section>
  );
}
