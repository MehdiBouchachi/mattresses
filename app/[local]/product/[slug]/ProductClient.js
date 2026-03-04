"use client";

import { useState, useEffect } from "react";
import RelatedSection from "../RelatedSection";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import ProductHeader from "@/components/features/product/ProductHeader";
import ProductGallery from "@/components/features/product/ProductGallery";
import WhyChooseSection from "@/components/features/product/WhyChooseSection";
import TechnicalSpecsSection from "@/components/features/product/TechnicalSpecsSection";
import FAQSection from "@/components/features/product/FAQSection";
import ProductInfoCard from "@/components/features/product/ProductInfoCard";

/* =========================
   MAIN COMPONENT
========================= */

export default function ProductClient({
  product,
  locale,
  allProducts,
  translation,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    breadcrumb,
    size: sizeTranslation,
    quantity: quantityTranslation,
    thickness: thicknessTranslation,
    actions: actionTranslation,
    features: featuresTranslation,
    faq: faqTranslation,
    guarantees: guaranteesTranslation,
  } = translation;

  const images = product.images ?? [];
  const dimensions = product.details?.dimensions ?? [];
  const densities = product.details?.densities ?? [];
  const whyChoose = product.details?.whyChoose ?? [];
  const technicalSpecs = product.details?.technicalSpecs ?? [];
  const faq = product.details?.faq ?? [];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedDimension, setSelectedDimension] = useState(dimensions[0]);
  const [selectedThickness, setSelectedThickness] = useState(null);
  const [selectedDensity, setSelectedDensity] = useState(
    densities[0]?.value ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});

  useEffect(() => {
    if (!selectedDimension?.options) return;

    let filtered = selectedDimension.options;

    if (selectedDensity) {
      filtered = filtered.filter((opt) => opt.density === selectedDensity);
    }

    if (filtered.length > 0) {
      const sorted = [...filtered].sort((a, b) => a.thickness - b.thickness);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedThickness(sorted[0]);
    }
  }, [selectedDimension, selectedDensity]);

  const unitBasePrice = selectedThickness?.price ?? 0;
  const discount = product.discount ?? 0;
  const hasDiscount = discount > 0;

  const discountedUnitPrice = hasDiscount
    ? Math.round(unitBasePrice * (1 - discount / 100))
    : unitBasePrice;

  const totalPrice = discountedUnitPrice * quantity;

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  const relatedProducts = allProducts.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: selectedImage,
        price: discountedUnitPrice,
        size: selectedDimension?.size,
        thickness: selectedThickness?.thickness,
        density: selectedDensity,
        quantity,
      }),
    );
  };

  const handleCheckout = () => {
    handleAddToCart();
    router.push(`/${locale}/checkout`);
  };

  if (!product) return null;

  return (
    <div className="bg-white min-h-screen">
      <ProductHeader
        breadcrumb={breadcrumb}
        product={product}
        locale={locale}
        router={router}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-20 grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-24 items-start">
        <ProductGallery
          images={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          zoomStyle={zoomStyle}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
          product={product}
        />

         <ProductInfoCard
    product={product}
    locale={locale}
    hasDiscount={hasDiscount}
    unitBasePrice={unitBasePrice}
    discountedUnitPrice={discountedUnitPrice}
    totalPrice={totalPrice}
    discount={discount}
    quantity={quantity}
    setQuantity={setQuantity}
    dimensions={dimensions}
    densities={densities}
    selectedDimension={selectedDimension}
    setSelectedDimension={setSelectedDimension}
    selectedDensity={selectedDensity}
    setSelectedDensity={setSelectedDensity}
    selectedThickness={selectedThickness}
    setSelectedThickness={setSelectedThickness}
    sizeTranslation={sizeTranslation}
    thicknessTranslation={thicknessTranslation}
    quantityTranslation={quantityTranslation}
    actionTranslation={actionTranslation}
    guaranteesTranslation={guaranteesTranslation}
    handleCheckout={handleCheckout}
    handleAddToCart={handleAddToCart}
  />
      </section>

      <WhyChooseSection whyChoose={whyChoose} />

      <TechnicalSpecsSection
        technicalSpecs={technicalSpecs}
        featuresTranslation={featuresTranslation}
      />

      <FAQSection
        faq={faq}
        openFAQ={openFAQ}
        setOpenFAQ={setOpenFAQ}
        faqTranslation={faqTranslation}
      />

      <RelatedSection currentProduct={product} allProducts={relatedProducts} />
    </div>
  );
}
