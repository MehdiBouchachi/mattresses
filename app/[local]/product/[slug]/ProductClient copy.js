"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RelatedSection from "../../../../src/components/features/product/RelatedSection";
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
  const whyChoose = product.details?.whyChoose ?? [];

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

  const densities = product.details?.densities ?? [];

  const [selectedDensity, setSelectedDensity] = useState(
    densities.length > 0 ? densities[0].value : null,
  );

  /* ======
     AUTO-SELECT SMALLEST THICKNESS WHEN SIZE CHANGES
  ======= */

  useEffect(() => {
    if (selectedDimension?.options?.length > 0) {
      let filteredOptions = selectedDimension.options;

      // If product has density (Classic)
      if (selectedDensity) {
        filteredOptions = filteredOptions.filter(
          (opt) => opt.density === selectedDensity,
        );
      }

      if (filteredOptions.length > 0) {
        const sorted = [...filteredOptions].sort(
          (a, b) => a.thickness - b.thickness,
        );
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedThickness(sorted[0]);
      } else {
        setSelectedThickness(null);
      }
    } else {
      setSelectedThickness(null);
    }
  }, [selectedDimension, selectedDensity]);
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
        density: selectedDensity, // 👈 add this
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-20 grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-24 items-start">
        {/* LEFT */}
        <div className="w-full max-w-full overflow-hidden">
          {/* MAIN IMAGE */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[4/3] bg-white rounded-3xl shadow-md overflow-hidden cursor-zoom-in"
          >
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              style={zoomStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
            />
          </div>

          {/* THUMBNAILS */}
          {images.length > 1 && (
            <div className="mt-5 relative">
              <div
                className="
        flex gap-3 overflow-x-auto 
        scroll-smooth snap-x snap-mandatory 
        scrollbar-hide
        pb-2
      "
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`
              snap-start flex-shrink-0
              w-16 h-16
              rounded-xl
              overflow-hidden
              border transition-all duration-200
              ${
                selectedImage === img
                  ? "border-blue-900 ring-2 ring-blue-900/20"
                  : "border-blue-100"
              }
            `}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-blue-100">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
            {product.category} · {product.subcategory}
          </p>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
            {product.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* PRICE */}
          <div className="mb-6 sm:mb-8 border-b border-blue-100 pb-6">
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through mb-2">
                {formatPrice(unitBasePrice)}
              </p>
            )}

            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900">
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
          {/* DENSITY (ONLY FOR CLASSIC) */}
          {densities.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xs uppercase mb-3">Density</h3>

              <div className="grid grid-cols-2 gap-3">
                {densities.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDensity(d.value)}
                    className={`py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border ${
                      selectedDensity === d.value
                        ? "bg-blue-900 text-white"
                        : "border-blue-100 hover:bg-blue-50"
                    }`}
                  >
                    {d.value}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SIZE */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs uppercase mb-3">{sizeTranslation}</h3>

            <div className="grid grid-cols-2 gap-3">
              {dimensions.map((dim) => (
                <button
                  dir="ltr"
                  key={dim.size}
                  onClick={() => setSelectedDimension(dim)}
                  className={`py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border ${
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
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xs uppercase mb-3">{thicknessTranslation}</h3>

              <div className="grid grid-cols-3 gap-3">
                {selectedDimension.options
                  .filter((opt) =>
                    selectedDensity ? opt.density === selectedDensity : true,
                  )
                  .sort((a, b) => a.thickness - b.thickness)
                  .map((opt) => (
                    <button
                      key={`${opt.thickness}-${opt.density || "default"}`}
                      onClick={() => setSelectedThickness(opt)}
                      className={`py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border ${
                        selectedThickness?.thickness === opt.thickness &&
                        (!selectedDensity || opt.density === selectedDensity)
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
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs uppercase mb-3">{quantityTranslation}</h3>

            <div className="flex items-center border rounded-full w-fit overflow-hidden text-sm sm:text-base">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-100"
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
              className="w-full bg-blue-900 text-white py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-medium hover:bg-blue-950 transition"
            >
              {actionTranslation.buyNow}
            </button>

            <button
              onClick={handleAddToCart}
              className="w-full border border-blue-900 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-blue-50 transition"
            >
              {actionTranslation.addToCart}
            </button>

            <div className="pt-4 border-t border-blue-100 text-sm text-center text-slate-600">
              {guaranteesTranslation}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      {whyChoose.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-blue-100">
          {/* HEADER */}
          <div className="max-w-3xl mb-14">
            <div className="w-12 h-[2px] bg-blue-900 mb-6"></div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-blue-950">
              Why Choose This Mattress?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every detail is designed to provide reliable support, long-term
              durability, and consistent comfort night after night.
            </p>
          </div>

          {/* GRID */}
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-14">
            {whyChoose.map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                {/* NUMBER */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full border border-blue-900 text-blue-900 flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </div>
                </div>

                {/* CONTENT */}
                <div>
                  <p className=" text-sm sm:text-base text-slate-800 leading-relaxed">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* TECH SPECS */}
      {technicalSpecs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-blue-100">
          {/* TITLE */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-blue-950">
            {featuresTranslation}
          </h2>

          {/* GRID */}
          <div className="grid gap-4 sm:gap-6">
            {technicalSpecs.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between items-center border-b border-blue-100 pb-3 sm:pb-4"
              >
                <span className="text-sm sm:text-base font-medium text-blue-950">
                  {spec.label}
                </span>

                <span className="text-sm sm:text-base text-slate-600 text-right max-w-[60%]">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-blue-100">
          {/* TITLE */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-blue-950">
            {faqTranslation}
          </h2>

          {/* ITEMS */}
          <div className="space-y-3 sm:space-y-4">
            {faq.map((item, i) => {
              const isOpen = openFAQ === i;

              return (
                <div
                  key={i}
                  className={`
              border border-blue-100
              rounded-lg sm:rounded-xl
              px-4 py-3 sm:p-5
              transition-all duration-300
              ${isOpen ? "bg-blue-50/40" : "bg-white"}
            `}
                >
                  {/* HEADER */}
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

                  {/* ANSWER */}
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
      )}

      <RelatedSection currentProduct={product} allProducts={relatedProducts} />
    </div>
  );
}
