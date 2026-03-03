"use client";

import { useState, useEffect } from "react";
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
    thickness: thicknessTranslation,
    actions: actionTranslation,
    features: featuresTranslation,
    faq: faqTranslation,
    guarantees: guaranteesTranslation,
  } = translation;

  /*  DERIVED DATA  */

  const images = product.images?.length > 0 ? product.images : [];

  const dimensions = product.details?.dimensions ?? [];

  const firmness = product.details?.firmness ?? 0;
  const technicalSpecs = product.details?.technicalSpecs ?? [];
  const faq = product.details?.faq ?? [];

  /*  STATE  */

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedDimension, setSelectedDimension] = useState(
    dimensions[0] || null,
  );
  const [selectedThickness, setSelectedThickness] = useState(
    dimensions[0]?.options
      ? [...dimensions[0].options].sort((a, b) => a.thickness - b.thickness)[0]
      : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});

  /* ======
     AUTO-SELECT SMALLEST THICKNESS WHEN SIZE CHANGES
  ======= */

  useEffect(() => {
    if (selectedDimension?.options?.length > 0) {
      const sorted = [...selectedDimension.options].sort(
        (a, b) => a.thickness - b.thickness,
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedThickness(sorted[0]);
    } else {
      setSelectedThickness(null);
    }
  }, [selectedDimension]);

  /*  PRICING  */

  const unitBasePrice = selectedThickness?.price ?? 0;

  const discount = product.discount ?? 0;
  const hasDiscount = discount > 0;

  const discountedUnitPrice = hasDiscount
    ? Math.round(unitBasePrice * (1 - discount / 100))
    : unitBasePrice;

  const totalPrice = discountedUnitPrice * quantity;

  /*  IMAGE ZOOM  */

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

  /*  RELATED  */

  const relatedProducts = allProducts.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );

  /*  ACTIONS  */

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: selectedImage,
        price: discountedUnitPrice,
        size: selectedDimension?.size,
        thickness: selectedThickness?.thickness,
        quantity,
      }),
    );
  };

  const handleCheckout = () => {
    handleAddToCart();
    router.push(`/${locale}/checkout`);
  };

  if (!product) return null;

  /*  UI  */

  return (
    <div className="bg-white min-h-screen">
      {/*  HEADER  */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
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

      {/*  HERO  */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">
        {/* LEFT */}
        <div>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-white rounded-3xl shadow-lg overflow-hidden mb-4 cursor-zoom-in"
          >
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              style={zoomStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[450px] object-cover transition-transform duration-300"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`min-w-[80px] h-[80px] rounded-xl overflow-hidden border ${
                  selectedImage === img ? "border-blue-900" : "border-blue-100"
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
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-blue-100">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
            {product.category} · {product.subcategory}
          </p>

          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>

          <p className="text-slate-600 mb-6">{product.description}</p>

          {/* PRICE */}
          <div className="mb-8 border-b border-blue-100 pb-6">
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through mb-2">
                {formatPrice(unitBasePrice)}
              </p>
            )}

            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-4xl font-bold text-blue-900">
                {formatPrice(
                  quantity === 1 ? discountedUnitPrice : totalPrice,
                  locale,
                )}
              </span>

              {quantity > 1 && (
                <span className="text-xs text-slate-600">
                  ({quantity} × {formatPrice(discountedUnitPrice, locale)})
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
                  dir="ltr"
                  key={dim.size}
                  onClick={() => setSelectedDimension(dim)}
                  className={`py-3 rounded-xl border ${
                    selectedDimension?.size === dim.size
                      ? "bg-blue-900 text-white"
                      : "border-blue-100 hover:bg-blue-50"
                  }`}
                >
                  {dim.size} cm
                </button>
              ))}
            </div>
          </div>

          {/* THICKNESS */}
          {selectedDimension?.options?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs uppercase mb-3">{thicknessTranslation}</h3>

              <div className="grid grid-cols-3 gap-3">
                {selectedDimension.options
                  .sort((a, b) => a.thickness - b.thickness)
                  .map((opt) => (
                    <button
                      dir="ltr"
                      key={opt.thickness}
                      onClick={() => setSelectedThickness(opt)}
                      className={`py-3 rounded-xl border ${
                        selectedThickness?.thickness === opt.thickness
                          ? "bg-blue-900 text-white"
                          : "border-blue-100 hover:bg-blue-50"
                      }`}
                    >
                      {opt.thickness} cm
                    </button>
                  ))}
              </div>
            </div>
          )}

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

              <div className="px-4">{quantity}</div>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
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
              onClick={handleAddToCart}
              className="w-full border border-blue-900 py-3 rounded-2xl hover:bg-blue-50 transition"
            >
              {actionTranslation.addToCart}
            </button>

            <div className="pt-4 border-t border-blue-100 text-sm text-center text-slate-600">
              {guaranteesTranslation}
            </div>
          </div>
        </div>
      </section>

      {/* TECH SPECS */}
      {technicalSpecs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-blue-100">
          <h2 className="text-3xl font-semibold mb-8 text-blue-950">
            {featuresTranslation}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {technicalSpecs.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between border-b pb-4"
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
          <h2 className="text-3xl font-semibold mb-8 text-blue-950">
            {faqTranslation}
          </h2>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <div
                key={i}
                className="border border-blue-100 rounded-xl p-5 cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                <h4 className="font-semibold">{item.question}</h4>

                <AnimatePresence>
                  {openFAQ === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
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
