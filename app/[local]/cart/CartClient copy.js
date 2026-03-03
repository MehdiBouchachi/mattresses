"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import BackTitle from "@/components/ui/BackTitle";
import CartSummary from "@/components/features/cart/CartSummary";
import CartItemCard from "@/components/features/cart/CartItemCard";
import EmptyCart from "@/components/features/cart/EmptyCart";

export default function CartClient({ locale, translation = {} }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const { empty, header, item: itemI18n, summary } = translation;

  const isRTL = locale === "ar";

  /* ================= DATA ================= */

  const data = {
    items,
    total,
    totalQuantity: items.reduce((acc, i) => acc + i.quantity, 0),
    totalSavings: items.reduce((acc, i) => {
      if (i.oldPrice && i.oldPrice > i.price) {
        return acc + (i.oldPrice - i.price) * i.quantity;
      }
      return acc;
    }, 0),
  };

  /* ================= ACTIONS ================= */

  const actions = {
    increase: (id, size, thickness, qty) =>
      dispatch(
        updateQuantity({
          id,
          size,
          thickness,
          quantity: qty + 1,
        }),
      ),

    decrease: (id, size, thickness) =>
      dispatch(
        decreaseQuantity({
          id,
          size,
          thickness,
        }),
      ),

    remove: (id, size, thickness) =>
      dispatch(
        removeFromCart({
          id,
          size,
          thickness,
        }),
      ),

    checkout: () => router.push(`/${locale}/checkout`),
    back: () => router.back(),
  };

  if (!data.items.length) {
    return (
      <EmptyCart
        data={{ locale }}
        actions={{ back: actions.back }}
        i18n={empty}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <div
        className="
          relative
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          pt-24 sm:pt-28 lg:pt-36
          pb-20 sm:pb-24
        "
      >
        <BackTitle
          locale={locale}
          onBack={actions.back}
          title={header.title}
          backLabel={header.continue}
        />

        <div
          className={`
    grid gap-12 lg:gap-20 items-start
    ${isRTL ? "lg:grid-cols-[0.55fr_1.45fr]" : "lg:grid-cols-[1.45fr_0.55fr]"}
  `}
        >
          <div className={`space-y-8 ${isRTL ? "lg:order-2" : ""}`}>
            {data.items.map((product) => (
              <CartItemCard
                key={`${product.id}-${product.size}-${product.thickness}`}
                data={product}
                actions={actions}
                i18n={itemI18n}
                locale={locale}
              />
            ))}
          </div>

          <div className={isRTL ? "lg:order-1" : ""}>
            <CartSummary
              data={data}
              actions={{ checkout: actions.checkout }}
              i18n={summary}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
