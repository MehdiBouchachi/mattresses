"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CategoryFilter from "./CategoryFilter";
import SubcategoryFilter from "./SubcategoryFilter";
import PriceFilter from "./PriceFilter";
import DimensionFilter from "./DimensionFilter";

export default function Filters({
  state,
  dispatch,
  filtersTranslation,
  locale,
}) {
  const [open, setOpen] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  /* ================= FOOTER OBSERVER ================= */

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideButton(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  /* ================= POP EFFECT WHEN RETURNING ================= */

  useEffect(() => {
    if (!hideButton) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setButtonVisible(false);
      const timeout = setTimeout(() => {
        setButtonVisible(true);
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [hideButton]);

  return (
    <>
      {/* ================= FILTER BUTTON ================= */}
      <AnimatePresence>
        {!hideButton && buttonVisible && (
          <motion.button
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            onClick={() => setOpen(true)}
            className="
              fixed bottom-20 right-4 md:bottom-8 md:right-8
              z-40
              bg-blue-900 text-white
              px-6 py-3
              rounded-full
              shadow-xl
              text-sm font-medium
              hover:bg-blue-950 transition
            "
          >
            {locale === "ar" ? "الفلاتر" : "Filters"}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ================= OVERLAY ================= */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* ================= DRAWER ================= */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="
                fixed top-0 right-0 h-full
                w-full md:w-[420px] lg:w-[480px]
                bg-white
                shadow-2xl
                z-50
                flex flex-col
              "
            >
              {/* Header */}
              <div className="flex justify-between items-center px-8 py-6 border-b border-blue-100">
                <h3 className="text-lg font-semibold text-blue-950">
                  {locale === "ar" ? "الفلاتر" : "Filters"}
                </h3>

                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-500 hover:text-blue-900 transition"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-12">
                <CategoryFilter
                  locale={locale}
                  state={state}
                  dispatch={dispatch}
                  translation={filtersTranslation}
                />

                <SubcategoryFilter
                  locale={locale}
                  state={state}
                  dispatch={dispatch}
                  translation={filtersTranslation}
                />

                <PriceFilter
                  locale={locale}
                  state={state}
                  dispatch={dispatch}
                  translation={filtersTranslation}
                />

                <DimensionFilter
                  state={state}
                  dispatch={dispatch}
                  translation={filtersTranslation}
                />
              </div>

              {/* Footer */}
              <div className="px-8 py-6 border-t border-blue-100">
                <button
                  onClick={() => setOpen(false)}
                  className="
                    w-full
                    bg-blue-900 text-white
                    py-3
                    rounded-xl
                    text-sm font-medium
                    hover:bg-blue-950
                    transition
                  "
                >
                  {locale === "ar" ? "تطبيق الفلاتر" : "Apply Filters"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
