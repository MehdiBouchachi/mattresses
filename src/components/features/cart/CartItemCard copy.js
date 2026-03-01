import { formatPrice } from "@/utils/helpers";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";

function CartItemCard({ data, actions, i18n = {}, locale }) {
  const { id, size, name, image, price, oldPrice, quantity } = data;
  const { increase, decrease, remove: removeAction } = actions;
  const { size: sizeLabel, save, each, remove } = i18n;

  const isRTL = locale === "ar";
  const hasDiscount = oldPrice && oldPrice > price;

  return (
    <div
      className="
        bg-white
        rounded-xl sm:rounded-2xl
        p-4 sm:p-5 lg:p-6
        border border-beige-500
        shadow-sm hover:shadow-md
        transition
      "
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* IMAGE */}
        <div
          className="
            relative
            w-full sm:w-28 md:w-32 lg:w-36
            h-28 sm:h-28 md:h-32 lg:h-36
            rounded-lg sm:rounded-xl
            overflow-hidden
            bg-beige-350
            flex-shrink-0
          "
        >
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        <div
          className={`
            flex-1
            flex flex-col sm:flex-row
            justify-between
            gap-4 sm:gap-6
          `}
        >
          {/* LEFT SIDE */}
          <div>
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">
              {name}
            </h3>

            <p className="text-xs sm:text-sm text-text-muted mb-4 sm:mb-6">
              {sizeLabel}: {size}
            </p>

            <QuantitySelector
              data={{ quantity }}
              actions={{
                increase: () => increase(id, size, quantity),
                decrease: () => decrease(id, size),
                remove: () => removeAction(id, size),
              }}
              i18n={{ remove }}
            />
          </div>

          {/* RIGHT SIDE */}
          <div
            className={`
              ${isRTL ? "sm:text-left" : "sm:text-right"}
              text-left sm:text-right
            `}
          >
            <p className="text-base sm:text-lg lg:text-xl font-bold text-primary-600">
              {formatPrice(price * quantity, locale)}
            </p>

            {hasDiscount && (
              <>
                <p className="text-xs sm:text-sm text-text-disabled line-through mt-1">
                  {formatPrice(oldPrice * quantity, locale)}
                </p>

                <p className="text-xs text-success-600 mt-1 font-medium">
                  {save} {formatPrice((oldPrice - price) * quantity, locale)}
                </p>
              </>
            )}

            <p className="text-xs sm:text-sm text-text-muted mt-2">
              {formatPrice(price, locale)} {each}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
