"use client";

import { useState, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import RelatedSection from "../RelatedSection";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { products } from "@/constants/products";
import { useRouter } from "next/navigation";
const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function ProductPage() {
  const params = useParams();
  const locale = params?.locale || "en";
  const { slug } = params;
  const dispatch = useDispatch();
  const router = useRouter();
  // ✅ Real product by slug
  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [slug]);

  // ✅ Safe fallbacks without changing UI
  const images = product.images?.length ? product.images : [product.image];
  const dimensions = product.details?.dimensions?.length
    ? product.details.dimensions
    : [{ size: "Default", price: product.price }];

  const firmness = product.details?.firmness ?? 0;
  const technicalSpecs = product.details?.technicalSpecs ?? [];
  const faq = product.details?.faq ?? [];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedDimension, setSelectedDimension] = useState(dimensions[0]);
  const [quantity, setQuantity] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});

  const unitBasePrice = selectedDimension.price ?? product.basePrice ?? 0;

  const discount = product.discount ?? 0;
  const hasDiscount = discount > 0;

  const discountedUnitPrice = hasDiscount
    ? Math.round(unitBasePrice * (1 - discount / 100))
    : unitBasePrice;

  const totalPrice = discountedUnitPrice * quantity;

  // Zoom logic (same)
  const handleMouseMove = (e) => {
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

  const relatedProducts = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
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
  return (
    <div className="bg-[#F8F6F2]">
      {/* ================= PAGE HEADER ================= */}
      <section className="max-w-7xl mx-auto px-8 pt-28 pb-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#8C857A] mb-6">
          <button
            onClick={() => router.push(`/${locale}`)}
            className="hover:text-[#2B2D6E] transition"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => router.push(`/${locale}/mattresses`)}
            className="hover:text-[#2B2D6E] transition"
          >
            Mattresses
          </button>
          <span>/</span>
          <span className="text-[#2B2D6E] font-medium">{product.name}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-[#2B2D6E] hover:underline"
        >
          ← Back to products
        </button>
      </section>
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-8 pb-28 grid lg:grid-cols-2 gap-24 items-start">
        {/* LEFT SIDE */}
        <div>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-white rounded-[48px] shadow-lg overflow-hidden mb-6 relative cursor-zoom-in"
          >
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              style={zoomStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[600px] object-cover transition-transform duration-300 ease-out"
            />
          </div>

          <div className="flex gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 rounded-xl overflow-hidden border transition ${
                  selectedImage === img
                    ? "border-[#2B2D6E]"
                    : "border-[#E9E2D8]"
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

        {/* RIGHT SIDE */}
        <div className="lg:sticky lg:top-24 self-start bg-white p-12 rounded-[40px] shadow-lg border border-[#E9E2D8]">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-[#9A8F82] mb-4">
              {product.category} · {product.subcategory}
            </p>

            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-[#1F1F1F]">
              {product.name}
            </h1>
          </div>

          <p className="text-[#6E6A64] mb-10 leading-relaxed text-lg">
            {product.description}
          </p>
          <div className="w-16 h-[2px] bg-[#2B2D6E] mb-10 opacity-20"></div>
          {/* PRICE */}
          <div className="mb-10 border-b border-[#E9E2D8] pb-8">
            {/* Old price */}
            {hasDiscount && (
              <p className="text-base text-gray-400 line-through mb-2">
                {formatPrice(unitBasePrice)}
              </p>
            )}

            {/* MAIN PRICE DISPLAY */}
            <div className="flex items-end gap-4 flex-wrap">
              {/* If quantity = 1 → show unit price big */}
              {quantity === 1 ? (
                <span className="text-5xl font-bold text-[#2B2D6E] tracking-tight">
                  {formatPrice(discountedUnitPrice)}
                </span>
              ) : (
                <>
                  {/* BIG TOTAL */}
                  <span className="text-5xl font-bold text-[#2B2D6E] tracking-tight">
                    {formatPrice(totalPrice)}
                  </span>

                  <span className="text-sm text-[#6E6A64] pb-2">
                    ({quantity} × {formatPrice(discountedUnitPrice)})
                  </span>
                </>
              )}

              {/* Discount badge */}
              {hasDiscount && (
                <span className="text-xs font-medium bg-[#2B2D6E]/10 text-[#2B2D6E] px-3 py-1 rounded-full">
                  −{discount}%
                </span>
              )}
            </div>

            {/* Clear unit info */}
            {quantity > 1 && (
              <p className="text-base text-[#6E6A64] mt-3">
                Unit price:{" "}
                <span className="font-medium text-black">
                  {formatPrice(discountedUnitPrice)}
                </span>
              </p>
            )}

            {/* Savings */}
          </div>

          {/* DIMENSIONS */}
          <div className="mb-10">
            <h3 className="text-sm uppercase tracking-wider text-[#9A8F82] mb-4">
              Select Size
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {dimensions.map((dim) => (
                <button
                  key={dim.size}
                  onClick={() => setSelectedDimension(dim)}
                  className={`px-6 py-3 rounded-xl border transition ${
                    selectedDimension.size === dim.size
                      ? "bg-[#2B2D6E] text-white border-[#2B2D6E]"
                      : "border-[#D9D1C6]"
                  }`}
                >
                  {dim.size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY (Improved) */}
          <div className="mb-10">
            <h3 className="text-sm uppercase tracking-wider text-[#9A8F82] mb-4">
              Quantity
            </h3>

            <div className="flex items-center border rounded-full w-fit overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-5 py-3 hover:bg-gray-100 transition"
              >
                −
              </button>

              <div className="px-6 text-lg font-medium">{quantity}</div>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-5 py-3 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* FIRMNESS */}
          <div className="mb-10">
            <div className="flex justify-between text-sm mb-2">
              <span>Soft</span>
              <span>Firm</span>
            </div>

            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-2 bg-[#2B2D6E] rounded-full"
                style={{
                  width: `${Math.min(10, Math.max(0, firmness)) * 10}%`,
                }}
              />
            </div>
          </div>
          <div className="mt-10 space-y-6">
            {/* PRIMARY ACTION */}
            <button
              onClick={handleCheckout}
              className="w-full bg-[#2B2D6E] text-white py-5 rounded-2xl text-lg font-medium transition-all duration-300 hover:bg-[#1E204F] shadow-lg hover:shadow-xl"
            >
              Buy Now
            </button>

            {/* SECONDARY ACTION */}
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
              className="w-full border border-[#2B2D6E] text-[#2B2D6E] py-4 rounded-2xl transition hover:bg-[#F4F3FF]"
            >
              Add to Cart
            </button>

            <div className="pt-4 border-t border-[#E9E2D8] text-sm text-[#6E6A64] text-center">
              Free delivery • 10-year warranty • Secure checkout
            </div>
          </div>
        </div>
      </section>

      {/* TECH SPECS */}
      {technicalSpecs.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 py-24 border-t border-[#E9E2D8]">
          <h2 className="text-4xl font-semibold mb-14">
            Technical Specifications
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {technicalSpecs.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between border-b pb-5 text-lg"
              >
                <span>{spec.label}</span>
                <span className="text-[#6E6A64]">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="max-w-5xl mx-auto px-8 py-24 border-t border-[#E9E2D8]">
          <h2 className="text-4xl font-semibold mb-14">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faq.map((item, i) => (
              <div
                key={i}
                className="border border-[#E9E2D8] rounded-2xl p-8 cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                <h4 className="font-semibold text-lg mb-2">{item.question}</h4>

                <AnimatePresence>
                  {openFAQ === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[#6E6A64]"
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

      {/* RELATED PRODUCTS (same place, same design) */}
      <RelatedSection currentProduct={product} allProducts={relatedProducts} />
    </div>
  );
}
