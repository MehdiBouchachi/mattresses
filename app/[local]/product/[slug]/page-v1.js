"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const product = {
  name: "Memory Foam Deluxe",
  description:
    "Pressure-relief memory foam with breathable comfort and orthopedic support designed for optimal spinal alignment.",

  category: "Foam",
  subcategory: "Memory",

  available: true,

  images: ["/images/mattresses.png", "/images/mattresses.png"],

  details: {
    thickness: 25,
    firmness: 7,

    dimensions: [
      { size: "90 x 190", price: 115000 },
      { size: "140 x 190", price: 145000 },
      { size: "160 x 200", price: 165000 },
    ],

    technicalSpecs: [
      { label: "Technology", value: "100% polyurethane foam" },
      { label: "Density", value: "D30 orthopedic support" },
      { label: "Fabric", value: "Stretch breathable textile" },
      { label: "Warranty", value: "10 years" },
      { label: "Thickness", value: "25 cm" },
    ],

    advantages: [
      "Professional orthopedic support",
      "High density D30 foam",
      "Soft comfort upper layer",
      "Made in Algeria",
    ],

    faq: [
      {
        question: "What is D30 foam?",
        answer:
          "D30 foam has a density of 30kg/m³ providing firm and durable support.",
      },
      {
        question: "Is it suitable for back pain?",
        answer:
          "Yes. The orthopedic density provides excellent spinal alignment.",
      },
    ],
  },
};

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedDimension, setSelectedDimension] = useState(
    product.details.dimensions[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);

  const totalPrice = selectedDimension.price * quantity;

  return (
    <div className="bg-[#F8F6F2]">
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-8 py-28 grid lg:grid-cols-2 gap-24">
        {/* LEFT SIDE */}
        <div>
          <div className="bg-white rounded-[48px] shadow-md overflow-hidden mb-6 relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-[600px] object-cover"
              />
            </AnimatePresence>

            <div className="absolute top-6 left-6 bg-[#2B2D6E] text-white px-4 py-1 rounded-full text-xs">
              10 Years Warranty
            </div>
          </div>

          <div className="flex gap-4">
            {product.images.map((img, i) => (
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
        <div className="lg:sticky lg:top-24 self-start bg-white p-12 rounded-[40px] shadow-md border border-[#E9E2D8]">
          <p className="text-xs uppercase tracking-widest text-[#9A8F82] mb-3">
            {product.category} / {product.subcategory}
          </p>

          <h1 className="text-5xl font-semibold mb-6 leading-tight">
            {product.name}
          </h1>

          <p className="text-[#6E6A64] mb-10 leading-relaxed text-lg">
            {product.description}
          </p>

          {/* PRICE */}
          <div className="mb-8">
            <span className="text-4xl font-bold text-[#2B2D6E]">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {/* DIMENSIONS */}
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wider text-[#9A8F82] mb-4">
              Select Size
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {product.details.dimensions.map((dim) => (
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

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full border"
            >
              +
            </button>
          </div>

          {/* FIRMNESS */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Soft</span>
              <span>Firm</span>
            </div>

            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-2 bg-[#2B2D6E] rounded-full"
                style={{
                  width: `${product.details.firmness * 10}%`,
                }}
              />
            </div>
          </div>

          {/* DELIVERY INFO */}
          <div className="text-sm text-[#6E6A64] mb-8">
            🚚 Estimated delivery: 2-4 days
          </div>

          <button className="w-full bg-[#2B2D6E] text-white py-4 rounded-full hover:opacity-90 transition text-lg">
            Add to Cart
          </button>
        </div>
      </section>

      {/* ================= TECH SPECS ================= */}
      <section className="max-w-7xl mx-auto px-8 py-24 border-t border-[#E9E2D8]">
        <h2 className="text-4xl font-semibold mb-14">
          Technical Specifications
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {product.details.technicalSpecs.map((spec) => (
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

      {/* ================= FAQ ================= */}
      <section className="max-w-5xl mx-auto px-8 py-24 border-t border-[#E9E2D8]">
        <h2 className="text-4xl font-semibold mb-14">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {product.details.faq.map((item, i) => (
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
    </div>
  );
}
