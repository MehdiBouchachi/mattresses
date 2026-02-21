"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RelatedSection from "../RelatedSection";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

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

const allProducts = [
  product, // current one

  {
    name: "Ortho Flex Premium",
    slug: "ortho-flex-premium",
    category: "Foam",
    subcategory: "Memory",
    price: 125000,
    image: "/images/mattresses.png",
  },
  {
    name: "Ocean Comfort",
    slug: "ocean-comfort",
    category: "Foam",
    subcategory: "Latex",
    price: 135000,
    image: "/images/mattresses.png",
  },
  {
    name: "Luxury Spine Support",
    slug: "luxury-spine-support",
    category: "Foam",
    subcategory: "Memory",
    price: 155000,
    image: "/images/mattresses.png",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedDimension, setSelectedDimension] = useState(
    product.details.dimensions[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const dispatch = useDispatch();

  const totalPrice = selectedDimension.price * quantity;

  // Zoom logic
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

  const relatedProducts = allProducts.filter(
    (p) => p.name !== product.name && p.category === product.category,
  );

  return (
    <div className="bg-[#F8F6F2]">
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-8 py-28 grid lg:grid-cols-2 gap-24">
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
        <div className="lg:sticky lg:top-24 self-start bg-white p-12 rounded-[40px] shadow-lg border border-[#E9E2D8]">
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
          <div className="mb-10">
            <span className="text-4xl font-bold text-[#2B2D6E]">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {/* DIMENSIONS */}
          <div className="mb-10">
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
                  width: `${product.details.firmness * 10}%`,
                }}
              />
            </div>
          </div>

          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.name,
                  image: selectedImage,
                  price: selectedDimension.price,
                  size: selectedDimension.size,
                  quantity,
                }),
              )
            }
            className="w-full bg-[#2B2D6E] text-white py-5 rounded-full hover:opacity-90 transition text-lg"
          >
            Add to Cart
          </button>
        </div>
      </section>
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
      {/* ================= RELATED PRODUCTS ================= */}
      <RelatedSection currentProduct={product} allProducts={allProducts} />
    </div>
  );
}
