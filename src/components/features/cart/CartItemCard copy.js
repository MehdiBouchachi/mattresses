import { formatPrice } from "@/utils/helpers";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";

function CartItemCard({ data, actions, i18n = {}, locale }) {
  const { id, size, thickness, name, image, price, oldPrice, quantity } = data;

  const { increase, decrease, remove: removeAction } = actions;
  const {
    size: sizeLabel,
    thickness: thicknessLabel,
    save,
    each,
    remove,
  } = i18n;

  const isRTL = locale === "ar";
  const hasDiscount = oldPrice && oldPrice > price;

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-5 sm:p-6
        border border-blue-100
        shadow-sm hover:shadow-md
        transition
      "
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* IMAGE */}
        <div
          className="
            relative
            w-full sm:w-32 lg:w-36
            h-32 lg:h-36
            rounded-xl
            overflow-hidden
            bg-blue-50
            shrink-0
          "
        >
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-6">
          {/* LEFT SIDE */}
          <div>
            <h3 className="text-lg font-semibold text-blue-950 mb-2">{name}</h3>

            {/* SIZE + THICKNESS */}
            <div className="text-sm text-slate-500 mb-6 space-y-1">
              <p>
                {sizeLabel}: <span dir="ltr">{size}</span>
                {isRTL ? " سم" : " cm"}
              </p>

              {thickness && (
                <p>
                  {thicknessLabel}: <span dir="ltr">{thickness}</span>{" "}
                  {isRTL ? " سم" : " cm"}
                </p>
              )}
            </div>

            <QuantitySelector
              data={{ quantity }}
              actions={{
                increase: () => increase(id, size, thickness, quantity),
                decrease: () => decrease(id, size, thickness),
                remove: () => removeAction(id, size, thickness),
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
            <p className="text-xl font-bold text-blue-900">
              {formatPrice(price * quantity, locale)}
            </p>

            {hasDiscount && (
              <>
                <p className="text-sm text-slate-400 line-through mt-1">
                  {formatPrice(oldPrice * quantity, locale)}
                </p>

                <p className="text-sm text-red-600 mt-1 font-semibold">
                  {save} {formatPrice((oldPrice - price) * quantity, locale)}
                </p>
              </>
            )}

            <p className="text-sm text-slate-500 mt-3">
              {formatPrice(price, locale)} {each}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
