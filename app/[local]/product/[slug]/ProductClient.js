"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RelatedSection from "../RelatedSection";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/helpers";

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
    firmness: firmnessTranslation,
    actions: actionTranslation,
    features: featuresTranslation,
    faq: faqTranslation,
    guarantees: guaranteesTranslation,
  } = translation;
  /* ================= DERIVED DATA ================= */

  const images = product.images?.length > 0 ? product.images : [product.image];

  const dimensions =
    product.details?.dimensions?.length > 0
      ? product.details.dimensions
      : [{ size: "Default", price: product.price }];

  const firmness = product.details?.firmness ?? 0;
  const technicalSpecs = product.details?.technicalSpecs ?? [];
  const faq = product.details?.faq ?? [];

  /* ================= STATE ================= */

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedDimension, setSelectedDimension] = useState(dimensions[0]);
  const [quantity, setQuantity] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});

  /* ================= PRICING ================= */

  const unitBasePrice = selectedDimension.price ?? product.basePrice ?? 0;

  const discount = product.discount ?? 0;
  const hasDiscount = discount > 0;

  const discountedUnitPrice = hasDiscount
    ? Math.round(unitBasePrice * (1 - discount / 100))
    : unitBasePrice;

  const totalPrice = discountedUnitPrice * quantity;

  /* ================= ZOOM ================= */

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

  /* ================= RELATED ================= */

  const relatedProducts = allProducts.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );

  /* ================= ACTIONS ================= */

  const handleCheckout = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: selectedImage,
        price: discountedUnitPrice,
        size: selectedDimension.size,
        quantity,
      }),
    );

    router.push(`/${locale}/checkout`);
  };

  if (!product) return null;

  /* ================= UI ================= */

  return (
    <div className="bg-white min-h-screen">
      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 mb-4">
          <button
            onClick={() => router.push(`/${locale}`)}
            className="hover:text-blue-700 transition"
          >
            {breadcrumb.home}
          </button>

          <span>/</span>

          <button
            onClick={() => router.push(`/${locale}/mattresses`)}
            className="hover:text-blue-700 transition"
          >
            {breadcrumb.collection}
          </button>

          <span>/</span>

          <span className="text-blue-900 font-medium truncate max-w-[150px]">
            {product.name}
          </span>
        </div>

        <button
          onClick={() => router.back()}
          className="text-xs sm:text-sm text-blue-900 hover:underline"
        >
          ← {breadcrumb.back}
        </button>
      </section>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">
        {/* LEFT */}
        <div>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-white rounded-3xl lg:rounded-[48px] shadow-lg overflow-hidden mb-4 cursor-zoom-in"
          >
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              style={zoomStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[320px] sm:h-[450px] lg:h-[600px] object-cover transition-transform duration-300"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`min-w-[70px] h-[70px] sm:w-24 sm:h-24 rounded-xl overflow-hidden border transition ${
                  selectedImage === img ? "border-blue-600" : "border-blue-100"
                }`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-3xl lg:rounded-[40px] shadow-lg border border-blue-100">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
            {product.category} · {product.subcategory}
          </p>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
            {product.name}
          </h1>

          <p className="text-slate-600 mb-6 text-sm sm:text-base">
            {product.description}
          </p>

          {/* PRICE */}
          <div className="mb-8 border-b border-blue-100 pb-6">
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through mb-2">
                {formatPrice(unitBasePrice)}
              </p>
            )}

            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-3xl sm:text-5xl font-bold text-blue-900">
                {formatPrice(quantity === 1 ? discountedUnitPrice : totalPrice)}
              </span>

              {quantity > 1 && (
                <span className="text-xs sm:text-sm text-slate-600">
                  ({quantity} × {formatPrice(discountedUnitPrice)})
                </span>
              )}

              {hasDiscount && (
                <span className="text-xs bg-blue-900/10 text-blue-900 px-2 py-1 rounded-full">
                  −{discount}%
                </span>
              )}
            </div>
          </div>

          {/* SIZE */}
          <div className="mb-8">
            <h3 className="text-xs uppercase mb-3">{sizeTranslation}</h3>

            <div className="grid grid-cols-2 gap-3">
              {dimensions.map((dim) => (
                <button
                  key={dim.size}
                  onClick={() => setSelectedDimension(dim)}
                  className={`py-2 sm:py-3 rounded-xl border text-sm ${
                    selectedDimension.size === dim.size
                      ? "bg-blue-900 text-white border-blue-900"
                      : "border-blue-800 hover:border-blue-900 hover:bg-blue-100 transition"
                  }`}
                >
                  {dim.size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mb-8">
            <h3 className="text-xs uppercase mb-3">{quantityTranslation}</h3>

            <div className="flex items-center border rounded-full w-fit overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                −
              </button>

              <div className="px-4 text-base">{quantity}</div>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* FIRMNESS */}
          <div className="mb-8">
            <div className="flex justify-between text-xs mb-2">
              <span>{firmnessTranslation.soft}</span>
              <span>{firmnessTranslation.firm}</span>
            </div>

            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-2 bg-blue-900 rounded-full"
                style={{
                  width: `${Math.min(10, Math.max(0, firmness)) * 10}%`,
                }}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-4">
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-900 text-white py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-medium hover:bg-blue-950 transition"
            >
              {actionTranslation.buyNow}
            </button>

            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    name: product.name,
                    image: selectedImage,
                    price: discountedUnitPrice,
                    size: selectedDimension.size,
                    quantity,
                  }),
                )
              }
              className="w-full border border-blue-900 py-3 rounded-2xl hover:bg-blue-50 transition"
            >
              {actionTranslation.addToCart}
            </button>

            <div className="pt-4 border-t border-blue-100 text-xs sm:text-sm text-slate-600 text-center">
              {guaranteesTranslation}
            </div>
          </div>
        </div>
      </section>

      {/* TECH SPECS */}
      {technicalSpecs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-blue-100">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-blue-950 font-semibold mb-8">
            {featuresTranslation}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {technicalSpecs.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between border-b pb-4 text-sm sm:text-base"
              >
                <span>{spec.label}</span>
                <span className="text-slate-600">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-blue-100">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-blue-950 font-semibold mb-8">
            {faqTranslation}
          </h2>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <div
                key={i}
                className="border border-blue-100 rounded-xl p-5 cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                <h4 className="font-semibold text-sm sm:text-base">
                  {item.question}
                </h4>

                <AnimatePresence>
                  {openFAQ === i && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      className="text-slate-600 mt-2 text-sm"
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      )}

      <RelatedSection currentProduct={product} allProducts={relatedProducts} />
    </div>
  );
}
