"use client";

import { useProduct } from "./ProductContext";

export default function WhyChooseSection() {
  const { product, locale, translation } = useProduct();

  const whyChoose = product.details?.whyChoose ?? [];

  if (!whyChoose.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-blue-100">
      <div className="max-w-3xl mb-14">
        <div className="w-12 h-[2px] bg-blue-900 mb-6"></div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-blue-950">
          {translation.whyChoose?.title ?? "Why Choose This Product?"}
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {translation.whyChoose?.desc ?? "Every detail is designed to provide reliable support, long-term durability, and consistent comfort night after night."}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-x-16 gap-y-14">
        {whyChoose.map((item, i) => (
          <div key={item.id ?? i} className="flex gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full border border-blue-900 text-blue-900 flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </div>
            </div>

            <div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {item.translations?.[locale] ?? item.translations?.en ?? ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
