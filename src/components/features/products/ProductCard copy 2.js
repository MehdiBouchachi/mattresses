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
    basePrice,
    oldPrice = null,
    images,
    available = true,
    category,
    slug,
    discount = 0,
  } = product;

  const image = images?.[0];
  const hasDiscount = discount > 0 && oldPrice;
  const isAvailable = Boolean(available);

  const finalPrice = hasDiscount
    ? Math.round(basePrice * (1 - discount / 100))
    : basePrice;

  const { soldOut, price: priceLabel, viewProduct, unavailable } = translation;

  return (
    <div
      className={`group bg-white rounded-2xl sm:rounded-[26px] border transition-all duration-300 overflow-hidden flex flex-col
        ${
          hasDiscount
            ? "border-primary-600/40 shadow-md sm:shadow-lg"
            : "border-beige-500 hover:border-beige-800"
        }
      `}
    >
      {/* Accent bar */}
      {hasDiscount && (
        <div className="h-[3px] w-full bg-gradient-to-r from-primary-600 to-[#4F52A3]" />
      )}

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-52 sm:h-60 lg:h-[260px] object-cover transition duration-700 ${
            isAvailable ? "group-hover:scale-105" : "grayscale"
          }`}
        />

        {hasDiscount && isAvailable && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary-600 text-white text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1 rounded-full shadow-md">
            -{discount}%
          </div>
        )}

        {!isAvailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-black text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full font-medium">
              {soldOut}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-6 lg:p-8 flex flex-col grow">
        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-text-subtle mb-2 sm:mb-3">
          {category}
        </p>

        <h3 className="text-base sm:text-lg lg:text-[20px] font-semibold leading-snug mb-2 sm:mb-3 text-[#1E1E1E]">
          {name}
        </h3>

        <p className="text-xs sm:text-sm text-text-muted mb-5 sm:mb-6 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="border-t border-beige-200 mb-4 sm:mb-6"></div>

        {/* PRICE + CTA */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          {/* PRICE BLOCK */}
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs text-text-subtle uppercase tracking-wider mb-1">
              {priceLabel}
            </span>

            {hasDiscount ? (
              <>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-600 leading-tight">
                  {formatPrice(finalPrice, locale)}
                </span>
                <span className="text-xs sm:text-sm text-text-disabled line-through mt-1 sm:mt-2">
                  {formatPrice(oldPrice, locale)}
                </span>
              </>
            ) : (
              <span className="text-lg sm:text-xl font-semibold text-primary-600">
                {formatPrice(basePrice, locale)}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="w-full sm:w-auto">
            {isAvailable ? (
              <Link href={`/${locale}/product/${slug}`} className="block">
                <Button size="sm" fullWidth className="sm:w-auto">
                  {viewProduct}
                </Button>
              </Link>
            ) : (
              <button
                disabled
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm rounded-md bg-gray-300 text-gray-600 cursor-not-allowed"
              >
                {unavailable}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
