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
    increase: (id, size, qty) =>
      dispatch(updateQuantity({ id, size, quantity: qty + 1 })),

    decrease: (id, size) => dispatch(decreaseQuantity({ id, size })),

    remove: (id, size) => dispatch(removeFromCart({ id, size })),

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
    <div className="bg-beige-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* HEADER */}
        <BackTitle
          locale={locale}
          onBack={actions.back}
          title={header.title}
          backLabel={header.continue}
        />

        <div className="grid lg:grid-cols-[1.45fr_0.55fr] gap-20 items-start">
          {/* ITEMS */}
          <div className="space-y-8">
            {data.items.map((product) => (
              <CartItemCard
                key={product.id + product.size}
                data={product}
                actions={actions}
                i18n={itemI18n}
                locale={locale}
              />
            ))}
          </div>

          {/* SUMMARY */}
          <CartSummary
            data={data}
            actions={{ checkout: actions.checkout }}
            i18n={summary}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
