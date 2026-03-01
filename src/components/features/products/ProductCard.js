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
      className={`
        group bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col
        ${
          hasDiscount
            ? "border-blue-300 shadow-md"
            : "border-blue-100 hover:border-blue-300"
        }
      `}
    >
      {/* Top Accent Bar */}
      {hasDiscount && <div className="h-[3px] w-full bg-blue-900" />}

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-52 sm:h-60 lg:h-[260px] object-cover transition duration-700 ${
            isAvailable ? "group-hover:scale-105" : "grayscale"
          }`}
        />

        {/* Discount Badge */}
        {hasDiscount && isAvailable && (
          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            -{discount}%
          </div>
        )}

        {/* Sold Out Overlay */}
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

        <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="border-t border-blue-100 mb-6"></div>

        {/* PRICE + CTA */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* PRICE BLOCK */}
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">
              {priceLabel}
            </span>

            {hasDiscount ? (
              <>
                <span className="text-xl font-bold text-blue-900">
                  {formatPrice(finalPrice, locale)}
                </span>
                <span className="text-sm text-slate-400 line-through mt-1">
                  {formatPrice(oldPrice, locale)}
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold text-blue-900">
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
                className="w-full sm:w-auto px-4 py-2 text-sm rounded-full bg-slate-200 text-slate-400 cursor-not-allowed"
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
