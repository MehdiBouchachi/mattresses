"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ value, label, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState("");

  /* Check if value contains a number */
  const numericMatch = value.match(/[\d.]+/);
  const hasNumber = numericMatch !== null;

  const numericValue = hasNumber ? parseFloat(numericMatch[0]) : 0;
  const prefix = hasNumber
    ? value.substring(0, value.indexOf(numericMatch[0]))
    : "";
  const suffix = hasNumber
    ? value.substring(value.indexOf(numericMatch[0]) + numericMatch[0].length)
    : "";
  const isDecimal = numericValue % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;

    /* If it's pure text (no number), just show the full value */
    if (!hasNumber) {
      setDisplayValue(value);
      return;
    }

    /* Animate the number */
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      /* ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericValue;

      setDisplayValue(
        isDecimal ? current.toFixed(1) : Math.floor(current).toString(),
      );

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [isInView, numericValue, isDecimal, hasNumber, value]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center text-center px-4 sm:px-6 group cursor-default"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {/* VALUE */}
      <motion.div
        className="text-2xl sm:text-3xl font-semibold text-blue-900 tracking-tight transition-transform duration-300 group-hover:scale-110"
        whileHover={{ textShadow: "0 0 20px rgba(59,130,246,0.3)" }}
      >
        {hasNumber ? (
          <>
            {prefix}
            {displayValue}
            {suffix}
          </>
        ) : (
          displayValue
        )}
      </motion.div>

      {/* ANIMATED UNDERLINE */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mt-2 mb-2"
        initial={{ width: 0 }}
        animate={isInView ? { width: 40 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
      />

      {/* LABEL */}
      <div className="text-[11px] sm:text-xs text-slate-500 leading-snug max-w-30">
        {label}
      </div>
    </motion.div>
  );
}

/* ─── GLOWING DIVIDER ─── */
function GlowDivider() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-blue-200 to-transparent" />
    </div>
  );
}

/* ─── MAIN ─── */
export default function TrustStrip({ translation }) {
  const {
    years: { value: valueYears, label: labelYears },
    materials: { value: valueMaterials, label: labelMaterials },
    tech: { value: valueTech, label: labelTech },
    delivery: { value: valueDelivery, label: labelDelivery },
  } = translation.home.trust;

  const items = [
    { value: valueYears, label: labelYears },
    { value: valueMaterials, label: labelMaterials },
    { value: valueTech, label: labelTech },
    { value: valueDelivery, label: labelDelivery },
  ];

  return (
    <section className="relative bg-white border-y border-blue-100/60 overflow-hidden">
      {/* Subtle shimmer background */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.3) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-y-8 lg:gap-y-0 items-center">
          {items.map((item, index) => (
            <div key={index} className="contents">
              <AnimatedCounter
                value={item.value}
                label={item.label}
                index={index}
              />
              {index < items.length - 1 && <GlowDivider />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
