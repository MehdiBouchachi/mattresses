"use client";

import Button from "@/components/ui/Button";

/* ================= PRODUCTS DATA ================= */

const products = [
  {
    id: 1,
    name: "Premium Foam",
    description: "High-density foam engineered for adaptive comfort.",
    price: 109000,
    image: "/images/mattresses.png",
    badge: "Best Seller",
    badgeType: "primary", // primary | gold | unavailable
    available: true,
  },
  {
    id: 2,
    name: "Pocket Spring",
    description: "Individual support with advanced suspension.",
    price: 111200,
    oldPrice: 139000,
    discount: 20,
    image: "/images/mattresses.png",
    badge: "-20%",
    badgeType: "gold",
    available: true,
  },
  {
    id: 3,
    name: "Hybrid Luxury",
    description: "Combined foam and springs for balanced performance.",
    price: 169000,
    image: "/images/mattresses.png",
    available: false,
  },
];

/* ================= HELPER ================= */

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

/* ================= PRODUCT CARD ================= */

function ProductCard({ product }) {
  const {
    name,
    description,
    price,
    oldPrice,
    discount,
    image,
    badge,
    badgeType,
    available,
  } = product;

  return (
    <div
      className={`group bg-white rounded-[28px] p-6 shadow-sm transition-all duration-500 flex flex-col ${
        available ? "hover:shadow-xl" : "opacity-90"
      }`}
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-[22px] bg-[#F3EEE6]">
        <img
          src={image}
          alt={name}
          className={`w-full h-[260px] object-cover transition duration-700 ${
            available ? "group-hover:scale-105" : "opacity-70"
          }`}
        />

        {/* BADGES */}
        {badge && available && (
          <span
            className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full ${
              badgeType === "primary"
                ? "bg-[#2B2D6E] text-white"
                : "bg-[#C6A75E] text-white"
            }`}
          >
            {badge}
          </span>
        )}

        {!available && (
          <span className="absolute top-4 left-4 bg-white/80 backdrop-blur px-4 py-1 text-xs rounded-full text-[#1C1C1C] border border-[#E6DED3]">
            Currently Unavailable
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="mt-6 flex flex-col flex-grow">
        <div>
          <h4
            className={`text-xl font-semibold mb-2 ${
              available ? "" : "text-[#777]"
            }`}
          >
            {name}
          </h4>

          <p
            className={`text-sm leading-relaxed ${
              available ? "text-[#6A6A6A]" : "text-[#9A9A9A]"
            }`}
          >
            {description}
          </p>
        </div>

        {/* BOTTOM BLOCK */}
        <div className="mt-auto pt-6 border-t border-[#EEE8DF] flex items-center justify-between">
          <div>
            {oldPrice && available ? (
              <>
                <div className="text-sm text-[#9A9A9A] line-through">
                  {formatPrice(oldPrice)}
                </div>
                <div className="text-lg font-semibold">
                  {formatPrice(price)}
                </div>
              </>
            ) : (
              <div className="text-lg font-semibold text-[#1C1C1C]">
                {formatPrice(price)}
              </div>
            )}
          </div>

          {available ? (
            <Button variant="primary" size="sm">
              View Product
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              disabled
              className="opacity-50 cursor-not-allowed"
            >
              Notify Me
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= SECTION ================= */

function ProductsSection() {
  return (
    <section className="py-32 bg-[#F9F7F3]">
      <div className="max-w-7xl mx-auto px-8">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <h3 className="text-4xl font-semibold">Our Collection</h3>
            <p className="text-[#6A6A6A] mt-3">
              Discover mattresses engineered for every sleep style.
            </p>
          </div>

          <Button variant="secondary" size="md">
            View All
          </Button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
