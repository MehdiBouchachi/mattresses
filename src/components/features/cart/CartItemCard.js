import { formatPrice } from "@/utils/helpers";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";

function CartItemCard({ data, actions, i18n = {}, locale }) {
  const { id, size, name, image, price, oldPrice, quantity } = data;

  const { increase, decrease, remove: removeAction } = actions;

  const { size: sizeLabel, save, each, remove } = i18n;

  const hasDiscount = oldPrice && oldPrice > price;

  return (
    <div className="bg-white rounded-2xl p-6 border border-beige-500 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col md:flex-row gap-8">
        {/* IMAGE */}
        <div className="relative w-full md:w-36 h-36 rounded-xl overflow-hidden bg-beige-350">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
          {/* LEFT */}
          <div>
            <h3 className="text-xl font-semibold mb-2">{name}</h3>

            <p className="text-sm text-text-muted mb-6">
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

          {/* RIGHT */}
          <div className="text-right">
            <p className="text-xl font-bold text-primary-600">
              {formatPrice(price * quantity, locale)}
            </p>

            {hasDiscount && (
              <>
                <p className="text-sm text-text-disabled line-through mt-1">
                  {formatPrice(oldPrice * quantity, locale)}
                </p>

                <p className="text-xs text-success-600 mt-1 font-medium">
                  {save} {formatPrice((oldPrice - price) * quantity, locale)}
                </p>
              </>
            )}

            <p className="text-sm text-text-muted mt-2">
              {formatPrice(price, locale)} {each}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartItemCard;
