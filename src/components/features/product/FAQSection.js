import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection({
  faq,
  openFAQ,
  setOpenFAQ,
  faqTranslation,
}) {
  if (!faq.length) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-blue-100">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-blue-950">
        {faqTranslation}
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {faq.map((item, i) => {
          const isOpen = openFAQ === i;

          return (
            <div
              key={i}
              className={`border border-blue-100 rounded-lg sm:rounded-xl px-4 py-3 sm:p-5 transition-all duration-300 ${
                isOpen ? "bg-blue-50/40" : "bg-white"
              }`}
            >
              <button
                onClick={() => setOpenFAQ(isOpen ? null : i)}
                className="w-full flex justify-between items-center text-left"
              >
                <h4 className="text-sm sm:text-base font-medium text-blue-950">
                  {item.question}
                </h4>

                <span className="text-blue-900 text-lg sm:text-xl">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
