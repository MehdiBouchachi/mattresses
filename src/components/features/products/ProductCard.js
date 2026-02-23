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

  return (
    <div
      className={`group bg-white rounded-[26px] border transition-all duration-300 overflow-hidden flex flex-col
        ${
          hasDiscount
            ? "border-primary-600/40 shadow-lg"
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
          className={`w-full h-[260px] object-cover transition duration-700 ${
            isAvailable ? "group-hover:scale-105" : "grayscale"
          }`}
        />

        {hasDiscount && isAvailable && (
          <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
            -{discount}%
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
        <p className="text-xs uppercase tracking-wider text-text-subtle mb-3">
          {category}
        </p>

        <h3 className="text-[20px] font-semibold leading-snug mb-3 text-[#1E1E1E]">
          {name}
        </h3>

        <p className="text-sm text-text-muted mb-8 leading-relaxed">
          {description}
        </p>

        <div className="border-t border-beige-200 mb-6"></div>

        {/* PRICE + CTA */}
        <div className="mt-auto flex items-end justify-between gap-6">
          <div className="flex flex-col min-w-[150px]">
            <span className="text-xs text-text-subtle uppercase tracking-wider mb-1">
              Price
            </span>

            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-primary-600 leading-tight">
                  {formatPrice(finalPrice)}
                </span>
                <span className="text-sm text-text-disabled line-through mt-2">
                  {formatPrice(oldPrice)}
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold text-primary-600">
                {formatPrice(basePrice)}
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
