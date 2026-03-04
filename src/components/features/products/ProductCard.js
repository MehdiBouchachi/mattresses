"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatPrice } from "@/utils/helpers";
import Image from "next/image";

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
    oldPrice,
    details,
  } = product;

  const image = images?.[0];
  const isAvailable = Boolean(available);

  const { soldOut, price: priceLabel, viewProduct, unavailable } = translation;

  /* =========================================================
     1️⃣ COMPUTE FINAL PRICE (exact > range > fallback)
  ========================================================== */

  let computedRange = null;

  if (!dynamicPrice && !priceRange && details?.dimensions) {
    const allPrices =
      details.dimensions.flatMap((d) => d.options?.map((o) => o.price)) || [];

    if (allPrices.length > 0) {
      computedRange = {
        min: Math.min(...allPrices),
        max: Math.max(...allPrices),
      };
    }
  }

  const finalRange = priceRange || computedRange;

  const finalPrice = dynamicPrice
    ? dynamicPrice
    : finalRange
      ? finalRange.min
      : null;

  const isExact = Boolean(dynamicPrice);
  const isRange = !dynamicPrice && finalRange;

  /* =========================================================
     2️⃣ DISCOUNT LOGIC
  ========================================================== */

  const hasDiscount = oldPrice && finalPrice && oldPrice > finalPrice;

  /* ========================================================= */

  return (
    <div
      className="
       group bg-white 
rounded-2xl  lg:rounded-3xl
border border-blue-100
hover:border-blue-200
shadow-sm sm:shadow-sm lg:hover:shadow-md
transition-all duration-300
overflow-hidden flex flex-col
      "
    >
      {/* IMAGE */}
      <div
        className="relative overflow-hidden 
  h-40 
  sm:h-44 
  md:h-48 
  lg:h-[240px]"
      >
        <Link href={`/${locale}/product/${slug}`}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 50vw,
           33vw"
            className={`object-cover transition duration-700 ${
              isAvailable ? "group-hover:scale-105" : "grayscale"
            }`}
          />
        </Link>

        {!isAvailable && (
          <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
            <span className="bg-white text-blue-900 text-xs sm:text-sm px-4 py-1.5 rounded-full font-medium">
              {soldOut}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 md:p-5 lg:p-6 flex flex-col grow">
        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 mb-1">
          {category}
        </p>

        <h3
          className=" text-sm 
          sm:text-base 
          md:text-base 
          lg:text-lg 
          font-semibold leading-snug mb-2 text-blue-900"
        >
          {name}
        </h3>

        <p
          className="  sm:block 
          text-xs 
          md:text-sm 
          text-slate-600 
          mb-3 
          leading-relaxed 
          line-clamp-2"
        >
          {description}
        </p>

        <div className="border-t border-blue-100 mb-3"></div>

        {/* ===== EXACT PRICE → INLINE ===== */}
        {isExact && (
          <div className="mt-auto flex items-end justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mb-1">
                {priceLabel}
              </span>

              {hasDiscount && (
                <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                  {formatPrice(oldPrice, locale)}
                </span>
              )}

              <span
                className="
                text-sm 
                sm:text-base 
                md:text-base 
                lg:text-lg 
                font-medium text-blue-900 whitespace-nowrap
              "
              >
                {formatPrice(finalPrice, locale)}
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
                  className="px-3 py-1.5 text-xs rounded-full bg-slate-200 text-slate-400 cursor-not-allowed"
                >
                  {unavailable}
                </button>
              )}
            </div>
          </div>
        )}

        {/* RANGE PRICE */}
        {isRange && (
          <div className="mt-auto">
            <div className="mb-3">
              <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider block mb-1">
                {priceLabel}
              </span>

              <span
                className="
                text-sm 
                sm:text-base 
                md:text-base 
                lg:text-lg 
                font-medium text-blue-900 whitespace-nowrap
              "
              >
                {formatPrice(finalRange.min, locale)}
                {finalRange.min !== finalRange.max &&
                  ` – ${formatPrice(finalRange.max, locale)}`}
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
                className="w-full px-3 py-1.5 text-xs rounded-full bg-slate-200 text-slate-400 cursor-not-allowed"
              >
                {unavailable}
              </button>
            )}
          </div>
        )}

        {!isExact && !isRange && (
          <div className="mt-auto">
            <span className="text-xs text-slate-400">{unavailable}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
