"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import CategoryFilter from "./CategoryFilter";
import SubcategoryFilter from "./SubcategoryFilter";
import PriceFilter from "./PriceFilter";
import DimensionFilter from "./DimensionFilter";

export default function Filters({ filtersTranslation, locale }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  /* ================= SET PARAM ================= */

  const setParam = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };
  /* ================= DETECT DESKTOP ================= */

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ================= FOOTER OBSERVER ================= */

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHideButton(entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  /* ================= BUTTON POP ================= */

  useEffect(() => {
    if (!hideButton) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setButtonVisible(false);

      const timeout = setTimeout(() => setButtonVisible(true), 60);

      return () => clearTimeout(timeout);
    }
  }, [hideButton]);

  /* ================= SCROLL LOCK ================= */

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      const storedScrollY = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, parseInt(storedScrollY || "0") * -1);
    };
  }, [open]);

  return (
    <>
      {/* FLOATING BUTTON */}

      <AnimatePresence>
        {!hideButton && buttonVisible && (
          <motion.button
            initial={{ scale: 0.92, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 bg-blue-900 text-white px-6 py-3 rounded-full shadow-xl text-sm font-medium hover:bg-blue-950"
          >
            {locale === "ar" ? "الفلاتر" : "Filters"}
          </motion.button>
        )}
      </AnimatePresence>

      {/* DRAWER */}

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Drawer */}

            <motion.div
              initial={isDesktop ? { x: "100%" } : { y: "100%" }}
              animate={isDesktop ? { x: 0 } : { y: 0 }}
              exit={isDesktop ? { x: "100%" } : { y: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed z-50 bg-white shadow-2xl flex flex-col ${
                isDesktop
                  ? "top-0 right-0 h-full w-120"
                  : "bottom-0 left-0 right-0 rounded-t-3xl max-h-[80vh]"
              }`}
            >
              {/* Header */}

              <div className="flex justify-between items-center px-8 py-6 border-b border-blue-100">
                <h3 className="text-lg font-semibold text-blue-950">
                  {locale === "ar" ? "الفلاتر" : "Filters"}
                </h3>

                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-500 hover:text-blue-900"
                >
                  ✕
                </button>
              </div>

              {/* Filters */}

              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-12">
                <CategoryFilter
                  locale={locale}
                  translation={filtersTranslation}
                  setParam={setParam}
                  searchParams={searchParams}
                />

                <SubcategoryFilter
                  locale={locale}
                  translation={filtersTranslation}
                  setParam={setParam}
                  searchParams={searchParams}
                />

                <PriceFilter
                  locale={locale}
                  translation={filtersTranslation}
                  setParam={setParam}
                  searchParams={searchParams}
                />

                <DimensionFilter
                  translation={filtersTranslation}
                  setParam={setParam}
                  searchParams={searchParams}
                />
              </div>

              {/* Footer */}

              <div className="px-8 py-6 border-t border-blue-100">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full bg-blue-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-950"
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
