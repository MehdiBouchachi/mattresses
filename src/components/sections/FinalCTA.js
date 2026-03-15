"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Button from "../ui/Button";

/* ─── SUBTLE PARTICLES ─── */
function CTAParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.5, 0],
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

/* ─── MAIN CTA ─── */
export default function FinalCTA({ translation, locale }) {
  const { title, desc, button } = translation.home.cta;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-36 bg-gradient-to-b from-white via-blue-50/30 to-blue-50 overflow-hidden"
    >
      {/* ANIMATED RADIAL GLOW */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SECONDARY GLOW */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-100 rounded-full blur-[200px] pointer-events-none"
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* PARTICLES */}
      <CTAParticles />

      <motion.div
        className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h3
          variants={itemVariants}
          className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-5 sm:mb-7 tracking-tight text-blue-950"
        >
          {title}
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12 lg:mb-16"
        >
          {desc}
        </motion.p>

        <motion.div variants={itemVariants} className="inline-block">
          <Link href={`/${locale}/mattresses`}>
            <motion.div
              className="relative group inline-block"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* PULSING GLOW */}
              <motion.div
                className="absolute -inset-3 bg-blue-500/15 rounded-2xl blur-2xl"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* HOVER RING GLOW */}
              <motion.div
                className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-blue-400/30 via-blue-600/20 to-blue-400/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
              />

              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="relative sm:w-auto px-10 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-lg font-medium"
              >
                {button}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}