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
        max-w-6xl mx-auto
        px-4 sm:px-6 lg:px-8
        pt-24 sm:pt-28 lg:pt-36 pb-10 sm:pb-14 lg:pb-16
      "
      >
        {/* HEADER */}
        <div className="mb-8 sm:mb-10 lg:mb-14">
          <BackTitle
            locale={locale}
            onBack={actions.back}
            title={header.title}
            backLabel={header.continue}
          />
        </div>

        {/* MAIN GRID */}
        <div
          className={`
          grid gap-8 sm:gap-10 lg:gap-16 items-start
          ${isRTL ? "lg:grid-cols-[0.6fr_1.4fr]" : "lg:grid-cols-[1.4fr_0.6fr]"}
        `}
        >
          {/* ================= CART ITEMS ================= */}
          <div
            className={`space-y-6 sm:space-y-8 ${isRTL ? "lg:order-2" : ""}`}
          >
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

          {/* ================= SUMMARY ================= */}
          <div
            className={`
            mt-6 sm:mt-8 lg:mt-0
            ${isRTL ? "lg:order-1" : ""}
          `}
          >
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
