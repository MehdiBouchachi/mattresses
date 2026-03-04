"use client";

import ProductHeader from "./ProductHeader";
import ProductGallery from "./ProductGallery";
import ProductInfoCard from "./ProductInfoCard";
import WhyChooseSection from "./WhyChooseSection";
import TechnicalSpecsSection from "./TechnicalSpecsSection";
import FAQSection from "./FAQSection";
import ProductProvider from "./ProductContext";
import RelatedSection from "./RelatedSection";
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
    <ProductProvider
      product={product}
      locale={locale}
      translation={translation}
    >
      <div className="bg-white min-h-screen">
        <ProductHeader />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-20 grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-24 items-start">
          <ProductGallery />
          <ProductInfoCard />
        </section>

        <WhyChooseSection />
        <TechnicalSpecsSection />
        <FAQSection />

        <RelatedSection
          currentProduct={product}
          allProducts={relatedProducts}
        />
      </div>
    </ProductProvider>
  );
}
