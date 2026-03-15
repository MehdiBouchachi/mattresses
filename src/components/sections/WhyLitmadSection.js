"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { FiActivity, FiLayers, FiWind, FiMoon } from "react-icons/fi";

/* ─── HEADLINE ─── */
function HeadlineBlock({ title, desc }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-12 sm:mb-16 lg:mb-24 px-2"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-blue-950 mb-4">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-slate-600 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

/* ─── STATEMENTS ─── */
function StatementsBlock({ statements, locale }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="space-y-7 sm:space-y-8">
      {statements.map(({ title, desc }, i) => (
        <motion.div
          key={i}
          className={
            locale === "ar"
              ? "md:border-r-3 border-r-2 border-blue-800 pr-4 sm:pr-6"
              : "md:border-l-3 border-l-2 border-blue-800 pl-4 sm:pl-6"
          }
          initial={{ opacity: 0, x: locale === "ar" ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: i * 0.2,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <h3 className="font-display text-md sm:text-lg font-semibold text-blue-950 mb-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── BENEFIT CARD ─── */
function BenefitCard({ title, index }) {
  const icons = [FiActivity, FiLayers, FiWind, FiMoon];
  const Icon = icons[index];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{
        y: -6,
        rotateY: 3,
        transition: { duration: 0.3 },
      }}
      className="group relative bg-white rounded-3xl p-7 border border-blue-100/80 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col items-center text-center cursor-default"
      style={{ perspective: 800 }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-100/50 via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-500"
      />

      <motion.div
        className="w-14 h-14 mb-4 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-800 text-xl"
        whileHover={{
          backgroundColor: "rgb(30 58 138)",
          color: "rgb(255 255 255)",
          scale: 1.1,
          rotate: 5,
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={22} />
      </motion.div>

      <h4 className="font-display text-md sm:text-lg font-semibold text-blue-950">
        {title}
      </h4>
    </motion.div>
  );
}

/* ─── BENEFITS GRID ─── */
function BenefitsGrid({ benefits }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20 lg:mb-28">
      {benefits.map((title, i) => (
        <BenefitCard key={title} title={title} index={i} />
      ))}
    </div>
  );
}

/* ─── TRUST STRIP ─── */
function TrustStrip({ trust }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3 text-center border-t border-blue-100 pt-10 gap-10 sm:gap-0"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {trust.map(({ value, label }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.15 }}
        >
          <p className="font-display text-2xl sm:text-3xl font-semibold text-blue-950">
            {value}
          </p>
          <p className="text-xs text-slate-500 mt-1">{label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── PARALLAX IMAGE ─── */
function ParallaxImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.98]);

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-[36px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] h-72 sm:h-96 lg:h-[520px]"
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src="/images/mattresses.png"
          alt="Empreinte Flex Mattress"
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 520px"
          priority
          className="object-cover transition duration-[2000ms] group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/10 via-transparent to-transparent" />
    </motion.div>
  );
}

/* ─── MAIN SECTION ─── */
export default function WhyLitmadSection({ translation, locale }) {
  const { title, desc, statements, benefits, trust } =
    translation.home.whyLitmad;

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      {/* ANIMATED BLOBS */}
      <motion.div
        className="hidden lg:block absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[160px]"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden lg:block absolute bottom-0 -left-40 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[180px]"
        animate={{
          opacity: [0.06, 0.15, 0.06],
          scale: [1, 1.05, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <HeadlineBlock title={title} desc={desc} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center mb-16 sm:mb-20 lg:mb-28">
          <ParallaxImage />
          <StatementsBlock statements={statements} locale={locale} />
        </div>

        <BenefitsGrid benefits={benefits} />
        <TrustStrip trust={trust} />
      </div>
    </section>
  );
}