"use client";

import { useState } from "react";
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

  return (
    <>
      {/* ================= DESKTOP + TABLET ================= */}
      <section className="hidden md:block bg-white border-b border-t border-blue-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 sm:py-8">
          {/* MOBILE STACKED LAYOUT */}
          <div
            className=" grid
           grid-cols-1
           sm:grid-cols-2
     
           lg:grid-cols-3
           gap-6 md:gap-8 lg:gap-12"
          >
            {/* Column 1 */}
            <div className="space-y-6 sm:space-y-8">
              <CategoryFilter
                locale={locale}
                state={state}
                dispatch={dispatch}
                translation={filtersTranslation}
              />
            </div>

            {/* Column 2 */}
            <div className="space-y-6 sm:space-y-8">
              <SubcategoryFilter
                locale={locale}
                state={state}
                dispatch={dispatch}
                translation={filtersTranslation}
              />
            </div>

            {/* Column 3 */}
            <div className="sm:col-span-2 md:col-span-2 lg:col-span-1 space-y-6">
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
          </div>
        </div>
      </section>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        {/* Floating Button */}
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-20 right-4 z-40
            bg-blue-900 text-white
            px-5 py-3
            rounded-full
            shadow-lg
            text-sm font-medium
          "
        >
          {locale === "ar" ? "الفلاتر" : "Filters"}
        </button>

        {/* Overlay + Bottom Sheet */}
        <AnimatePresence>
          {open && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-black/40 z-40"
              />

              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="
                  fixed bottom-0 left-0 right-0 z-50
                  bg-white
                  rounded-t-3xl
                  shadow-2xl
                  max-h-[85vh]
                  flex flex-col
                "
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100">
                  <h3 className="text-base font-semibold text-blue-950">
                    {locale === "ar" ? "الفلاتر" : "Filters"}
                  </h3>

                  <button
                    onClick={() => setOpen(false)}
                    className="text-sm text-slate-500"
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto px-6 py-6 space-y-8">
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

                {/* Footer Action */}
                <div className="p-6 border-t border-blue-100">
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
      </div>
    </>
  );
}
