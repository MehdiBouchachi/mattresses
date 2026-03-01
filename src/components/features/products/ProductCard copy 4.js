"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatPrice } from "@/utils/helpers";

function ProductCard({ product, translation }) {
  const params = useParams();
  const locale = params?.local;

  const {
    name,
    description,
    images,
    available = true,
    category,
    slug,
    dynamicPrice,
    priceRange,
  } = product;

  const image = images?.[0];
  const isAvailable = Boolean(available);

  const { soldOut, price: priceLabel, viewProduct, unavailable } = translation;

  const isRange = !dynamicPrice && priceRange;

  return (
    <div
      className="
        group bg-white rounded-3xl border border-blue-100
        hover:border-blue-300 hover:shadow-md
        transition-all duration-300
        overflow-hidden flex flex-col
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-52 sm:h-60 lg:h-[260px] object-cover transition duration-700 ${
            isAvailable ? "group-hover:scale-105" : "grayscale"
          }`}
        />

        {!isAvailable && (
          <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
            <span className="bg-white text-blue-900 text-xs sm:text-sm px-4 py-1.5 rounded-full font-medium">
              {soldOut}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col grow">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
          {category}
        </p>

        <h3 className="text-lg font-semibold leading-snug mb-2 text-blue-900">
          {name}
        </h3>

        <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="border-t border-blue-100 mb-4"></div>

        {/* ===== EXACT PRICE → INLINE LAYOUT ===== */}
        {dynamicPrice && (
          <div className="mt-auto flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                {priceLabel}
              </span>

              <span className="text-base sm:text-lg font-medium text-blue-900 whitespace-nowrap">
                {formatPrice(dynamicPrice, locale)}
              </span>
            </div>

            <div className="shrink-0">
              {isAvailable ? (
                <Link href={`/${locale}/product/${slug}`}>
                  <Button size="sm">{viewProduct}</Button>
                </Link>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 text-sm rounded-full bg-slate-200 text-slate-400 cursor-not-allowed"
                >
                  {unavailable}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ===== RANGE PRICE → BUTTON AT BOTTOM ===== */}
        {isRange && (
          <div className="mt-auto">
            <div className="mb-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
                {priceLabel}
              </span>

              <span className="text-base sm:text-lg font-medium text-blue-900 whitespace-nowrap">
                {formatPrice(priceRange.min, locale)}
                {priceRange.min !== priceRange.max &&
                  ` – ${formatPrice(priceRange.max, locale)}`}
              </span>
            </div>

            {isAvailable ? (
              <Link href={`/${locale}/product/${slug}`} className="block">
                <Button size="sm" fullWidth>
                  {viewProduct}
                </Button>
              </Link>
            ) : (
              <button
                disabled
                className="w-full px-4 py-2 text-sm rounded-full bg-slate-200 text-slate-400 cursor-not-allowed"
              >
                {unavailable}
              </button>
            )}
          </div>
        )}

        {/* ===== FALLBACK ===== */}
        {!dynamicPrice && !priceRange && (
          <div className="mt-auto">
            <span className="text-sm text-slate-400">{unavailable}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
