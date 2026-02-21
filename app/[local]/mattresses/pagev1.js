"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

/* ================= CATEGORY STRUCTURE ================= */

const categories = [
  { name: "Foam", value: "foam", subcategories: ["memory", "orthopedic"] },
  { name: "Spring", value: "spring", subcategories: ["pocket", "bonnell"] },
  { name: "Hybrid", value: "hybrid", subcategories: ["luxury", "cooling"] },
  {
    name: "Accessories",
    value: "accessories",
    subcategories: ["pillow", "protector"],
  },
];

/* ================= PRODUCTS ================= */

const products = [
  {
    id: 1,
    slug: "memory-foam-deluxe",
    name: "Memory Foam Deluxe",
    description: "Pressure-relief memory foam with breathable comfort.",
    price: 115000,
    category: "foam",
    subcategory: "memory",
    image: "/images/mattresses.png",
    available: true,
  },
  {
    id: 2,
    slug: "orthopedic-foam-pro",
    name: "Orthopedic Foam Pro",
    description: "Firm support engineered for spinal alignment.",
    price: 128000,
    category: "foam",
    subcategory: "orthopedic",
    image: "/images/mattresses.png",
    available: true,
  },
  {
    id: 3,
    slug: "pocket-spring-elite",
    name: "Pocket Spring Elite",
    description: "Individual pocket coils for motion isolation.",
    price: 149000,
    oldPrice: 179000,
    discount: 17,
    category: "spring",
    subcategory: "pocket",
    image: "/images/mattresses.png",
    available: true,
  },
  {
    id: 4,
    slug: "bonnell-classic",
    name: "Bonnell Classic",
    description: "Durable traditional spring structure.",
    price: 99000,
    category: "spring",
    subcategory: "bonnell",
    image: "/images/mattresses.png",
    available: false,
  },
  {
    id: 5,
    slug: "luxury-hybrid-max",
    name: "Luxury Hybrid Max",
    description: "Foam and coils combined for premium balance.",
    price: 175000,
    category: "hybrid",
    subcategory: "luxury",
    image: "/images/mattresses.png",
    available: true,
  },
  {
    id: 6,
    slug: "cooling-hybrid-breeze",
    name: "Cooling Hybrid Breeze",
    description: "Temperature-regulated hybrid comfort.",
    price: 162000,
    category: "hybrid",
    subcategory: "cooling",
    image: "/images/mattresses.png",
    available: true,
  },
  {
    id: 7,
    slug: "luxury-pillow",
    name: "Luxury Pillow",
    description: "Ergonomic support pillow.",
    price: 9000,
    category: "accessories",
    subcategory: "pillow",
    image: "/images/mattresses.png",
    available: true,
  },
  {
    id: 8,
    slug: "mattress-protector",
    name: "Mattress Protector",
    description: "Waterproof breathable protection layer.",
    price: 6500,
    category: "accessories",
    subcategory: "protector",
    image: "/images/mattresses.png",
    available: true,
  },
];

/* ================= HELPERS ================= */

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

/* ================= PAGE ================= */

export default function MattressesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSub, setSelectedSub] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        selectedCategory === "all" || p.category === selectedCategory;

      const subMatch = selectedSub === "all" || p.subcategory === selectedSub;

      const priceMatch = p.price >= minPrice && p.price <= maxPrice;

      return categoryMatch && subMatch && priceMatch;
    });
  }, [selectedCategory, selectedSub, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const formatInput = (value) => {
    const numeric = value.replace(/\s/g, "");
    if (!numeric) return "";
    return new Intl.NumberFormat("fr-DZ").format(Number(numeric));
  };

  const parseInput = (value) => Number(value.replace(/\s/g, ""));

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* HERO */}
      <section className="pt-44 pb-20 bg-[#EFEAE2]">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-semibold mb-4">All Mattresses</h1>
          <p className="text-[#6A6A6A] max-w-xl">
            Explore our full product universe engineered for premium comfort.
          </p>
        </div>
      </section>

      {/* FILTER PANEL */}
      <section className="bg-white border-b border-[#E6DED3]">
        <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-16">
          {/* CATEGORY */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#888] mb-6">
              Category
            </h3>
            <div className="space-y-3 text-sm">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedSub("all");
                }}
                className={`block transition ${
                  selectedCategory === "all"
                    ? "text-[#2B2D6E] font-semibold"
                    : "text-[#555] hover:text-black"
                }`}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    setSelectedSub("all");
                  }}
                  className={`block transition ${
                    selectedCategory === cat.value
                      ? "text-[#2B2D6E] font-semibold"
                      : "text-[#555] hover:text-black"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* SUBCATEGORY */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#888] mb-6">
              Subcategory
            </h3>

            <div className="space-y-3 text-sm">
              <button
                onClick={() => setSelectedSub("all")}
                className={`block transition ${
                  selectedSub === "all"
                    ? "text-[#2B2D6E] font-semibold"
                    : "text-[#555] hover:text-black"
                }`}
              >
                All
              </button>

              {categories
                .find((c) => c.value === selectedCategory)
                ?.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSub(sub)}
                    className={`block capitalize transition ${
                      selectedSub === sub
                        ? "text-[#2B2D6E] font-semibold"
                        : "text-[#555] hover:text-black"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
            </div>
          </div>

          {/* PRICE RANGE */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#888] mb-6">
              Price Range
            </h3>

            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={formatInput(String(minPrice))}
                onChange={(e) => setMinPrice(parseInput(e.target.value))}
                className="border border-[#D9D1C6] rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-[#2B2D6E] outline-none"
              />
              <input
                type="text"
                value={formatInput(String(maxPrice))}
                onChange={(e) => setMaxPrice(parseInput(e.target.value))}
                className="border border-[#D9D1C6] rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-[#2B2D6E] outline-none"
              />
            </div>

            <p className="text-xs text-[#6A6A6A]">
              {formatPrice(minPrice)} – {formatPrice(maxPrice)}
            </p>

            <button
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(200000);
              }}
              className="mt-4 text-sm font-medium text-[#2B2D6E] hover:underline"
            >
              Reset Price
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className={`group bg-white rounded-[26px] border transition-all duration-300 overflow-hidden flex flex-col
                  ${
                    product.discount
                      ? "border-[#2B2D6E]/40 shadow-lg"
                      : "border-[#E9E2D8] hover:border-[#D6CDC0]"
                  }
                `}
              >
                {/* Accent bar for discount */}
                {product.discount && (
                  <div className="h-[3px] w-full bg-gradient-to-r from-[#2B2D6E] to-[#4F52A3]" />
                )}

                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    className={`w-full h-[260px] object-cover transition duration-700 ${
                      product.available ? "group-hover:scale-105" : "grayscale"
                    }`}
                  />

                  {product.discount && product.available && (
                    <div className="absolute top-4 right-4 bg-[#2B2D6E] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                      -{product.discount}%
                    </div>
                  )}

                  {!product.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-black text-sm px-4 py-2 rounded-full font-medium">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-xs uppercase tracking-wider text-[#9A8F82] mb-3">
                    {product.category}
                  </p>

                  <h3 className="text-[20px] font-semibold leading-snug mb-3 text-[#1E1E1E]">
                    {product.name}
                  </h3>

                  <p className="text-sm text-[#6E6A64] mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="border-t border-[#EEE7DC] mb-6"></div>

                  {/* PRICE + BUTTON */}
                  <div className="mt-auto flex items-end justify-between gap-6">
                    <div className="flex flex-col min-w-[150px]">
                      <span className="text-xs text-[#9A8F82] uppercase tracking-wider mb-1">
                        Price
                      </span>

                      {product.discount ? (
                        <>
                          <span className="text-2xl font-bold text-[#2B2D6E] leading-tight">
                            {formatPrice(product.price)}
                          </span>

                          <div className="mt-2">
                            <span className="text-sm text-[#A8A29E] line-through">
                              {formatPrice(product.oldPrice)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-xl font-semibold text-[#2B2D6E]">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    <div className="shrink-0">
                      {product.available ? (
                        <Link href={`/product/${product.slug}`}>
                          <Button size="sm">View Product</Button>
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 text-sm rounded-md bg-gray-300 text-gray-600 cursor-not-allowed"
                        >
                          Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-16 gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm transition ${
                    page === i + 1
                      ? "bg-[#2B2D6E] text-white"
                      : "border border-[#DDD] hover:bg-[#EEE]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
