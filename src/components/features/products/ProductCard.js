import Button from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

function ProductCard({ product }) {
  const params = useParams();
  const locale = params?.local;

  const {
    name,
    description,
    price,
    oldPrice = null,
    image,
    available = true,
    category,
    slug,
  } = product;

  // Derived logic
  const hasDiscount = oldPrice && oldPrice > price;

  const calculatedDiscount = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const isAvailable = Boolean(available);

  return (
    <div
      className={`group bg-white rounded-[26px] border transition-all duration-300 overflow-hidden flex flex-col
        ${
          hasDiscount
            ? "border-[#2B2D6E]/40 shadow-lg"
            : "border-[#E9E2D8] hover:border-[#D6CDC0]"
        }
      `}
    >
      {/* Accent bar */}
      {hasDiscount && (
        <div className="h-[3px] w-full bg-gradient-to-r from-[#2B2D6E] to-[#4F52A3]" />
      )}

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-[260px] object-cover transition duration-700 ${
            isAvailable ? "group-hover:scale-105" : "grayscale"
          }`}
        />

        {hasDiscount && isAvailable && (
          <div className="absolute top-4 right-4 bg-[#2B2D6E] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
            -{calculatedDiscount}%
          </div>
        )}

        {!isAvailable && (
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
          {category}
        </p>

        <h3 className="text-[20px] font-semibold leading-snug mb-3 text-[#1E1E1E]">
          {name}
        </h3>

        <p className="text-sm text-[#6E6A64] mb-8 leading-relaxed">
          {description}
        </p>

        <div className="border-t border-[#EEE7DC] mb-6"></div>

        {/* PRICE + CTA */}
        <div className="mt-auto flex items-end justify-between gap-6">
          <div className="flex flex-col min-w-[150px]">
            <span className="text-xs text-[#9A8F82] uppercase tracking-wider mb-1">
              Price
            </span>

            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-[#2B2D6E] leading-tight">
                  {formatPrice(price)}
                </span>
                <span className="text-sm text-[#A8A29E] line-through mt-2">
                  {formatPrice(oldPrice)}
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold text-[#2B2D6E]">
                {formatPrice(price)}
              </span>
            )}
          </div>

          <div className="shrink-0">
            {isAvailable ? (
              <Link href={`/${locale}/product/${slug}`}>
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
  );
}

export default ProductCard;
