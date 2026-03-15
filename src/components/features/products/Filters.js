"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import CategoryFilter from "./CategoryFilter";
import SubcategoryFilter from "./SubcategoryFilter";
import TypeFilter from "./TypeFilter";
import PriceFilter from "./PriceFilter";
import DimensionFilter from "./DimensionFilter";

export default function Filters({
  filtersTranslation,
  locale,
  categories,
  dimensions,
  thicknesses,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  /* ================= ACTIVE FILTER COUNT ================= */

  const activeCount = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    return [...params.keys()].length;
  }, [searchParams]);

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

  /* ================= RESET FILTERS ================= */

  const resetFilters = () => {
    router.push(`?`, { scroll: false });
    setOpen(false);
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
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="
    fixed
    bottom-20 right-4 md:bottom-8 md:right-8
    z-40
    flex items-center gap-2
    bg-blue-900
    text-white
    px-3 py-2
    rounded-full
    shadow-lg
    text-sm
    font-medium
    hover:bg-blue-950
    transition-all
  "
          >
            {/* ICON */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18M6 12h12M10 20h4"
              />
            </svg>

            {locale === "ar" ? "الفلاتر" : "Filters"}

            {activeCount > 0 && (
              <span className="ml-1 bg-white text-blue-900 text-xs font-semibold px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* DRAWER */}

      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* DRAWER */}

            <motion.div
              initial={isDesktop ? { x: "100%" } : { y: "100%" }}
              animate={isDesktop ? { x: 0 } : { y: 0 }}
              exit={isDesktop ? { x: "100%" } : { y: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed z-50 bg-white shadow-2xl flex flex-col ${
                isDesktop
                  ? "top-0 right-0 h-full w-[420px]"
                  : "bottom-0 left-0 right-0 rounded-t-3xl max-h-[80vh]"
              }`}
            >
              {/* HEADER */}

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

              {/* FILTERS */}

              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-12">
                <CategoryFilter
                  locale={locale}
                  translation={filtersTranslation}
                  setParam={setParam}
                  searchParams={searchParams}
                  categories={categories.filter((c) => c.type === "main")}
                />

                <SubcategoryFilter
                  locale={locale}
                  translation={filtersTranslation}
                  setParam={setParam}
                  searchParams={searchParams}
                  categories={categories}
                />

                <TypeFilter
                  locale={locale}
                  translation={filtersTranslation}
                  setParam={setParam}
                  searchParams={searchParams}
                  categories={categories}
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
                  dimensions={dimensions}
                  thicknesses={thicknesses}
                />
              </div>

              {/* FOOTER */}

              <div className="px-8 py-6 border-t border-blue-100 flex gap-3">
                {/* RESET */}

                <button
                  onClick={resetFilters}
                  className="flex-1 border border-blue-200 text-blue-900 py-3 rounded-xl text-sm font-medium hover:bg-blue-50"
                >
                  {locale === "ar" ? "إعادة ضبط" : "Reset"}
                </button>

                {/* APPLY */}

                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-blue-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-950"
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
