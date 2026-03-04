"use client";

import ProductProvider from "./ProductProvider";
import ProductHeader from "./ProductHeader";
import ProductGallery from "./ProductGallery";
import ProductInfoCard from "./ProductInfoCard";
import WhyChooseSection from "./WhyChooseSection";
import TechnicalSpecsSection from "./TechnicalSpecsSection";
import FAQSection from "./FAQSection";
import RelatedSection from "../../../../src/components/features/product/RelatedSection";

export default function ProductClient({
  product,
  locale,
  allProducts,
  translation,
}) {
  const relatedProducts = allProducts.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );

  return (
    <ProductProvider product={product}>
      <div className="bg-white min-h-screen">
        <ProductHeader
          product={product}
          locale={locale}
          translation={translation}
        />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-20 grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-24 items-start">
          <ProductGallery />
          <ProductInfoCard translation={translation} locale={locale} />
        </section>

        <WhyChooseSection product={product} />
        <TechnicalSpecsSection product={product} translation={translation} />
        <FAQSection product={product} translation={translation} />

        <RelatedSection
          currentProduct={product}
          allProducts={relatedProducts}
        />
      </div>
    </ProductProvider>
  );
}
