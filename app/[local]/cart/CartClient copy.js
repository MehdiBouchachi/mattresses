"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/helpers";

export default function CartClient({ locale, translation }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);

  const totalSavings = items.reduce((acc, item) => {
    if (item.oldPrice && item.oldPrice > item.price) {
      return acc + (item.oldPrice - item.price) * item.quantity;
    }
    return acc;
  }, 0);

  const { empty, header, item: itemTranslation, summary } = translation || {};

  /* ================= EMPTY STATE ================= */

  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-beige-100">
        <h1 className="text-3xl font-semibold mb-4">{empty?.title}</h1>

        <p className="text-text-muted mb-8">{empty?.description}</p>

        <button
          onClick={() => router.back()}
          className="text-primary-600 font-medium hover:underline"
        >
          {locale === "ar" ? empty.continue + " ←" : empty.continue + " →"}
        </button>
      </div>
    );
  }

  /* ================= MAIN CART ================= */

  return (
    <div className="bg-beige-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* HEADER */}
        <div className="mb-16">
          <button
            onClick={() => router.back()}
            className="text-sm text-primary-600 hover:underline mb-5"
          >
            {locale === "ar" ? header.continue + " ←" : header.continue + " →"}
          </button>

          <h1 className="text-4xl font-semibold tracking-tight">
            {header?.title}
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1.45fr_0.55fr] gap-20 items-start">
          {/* ================= LEFT SIDE ================= */}

          <div className="space-y-8">
            {items.map((item) => {
              const hasDiscount = item.oldPrice && item.oldPrice > item.price;

              return (
                <div
                  key={item.id + item.size}
                  className="bg-white rounded-2xl p-6 border border-beige-500 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* IMAGE */}
                    <div className="relative w-full md:w-36 h-36 rounded-xl overflow-hidden bg-beige-350">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
                      {/* LEFT DETAILS */}
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {item.name}
                        </h3>

                        <p className="text-sm text-text-muted mb-6">
                          {itemTranslation?.size}: {item.size}
                        </p>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-beige-350 rounded-full overflow-hidden">
                            <button
                              onClick={() =>
                                dispatch(
                                  decreaseQuantity({
                                    id: item.id,
                                    size: item.size,
                                  }),
                                )
                              }
                              className="px-4 py-2 hover:bg-beige-450 transition"
                            >
                              −
                            </button>

                            <div className="px-6 font-medium">
                              {item.quantity}
                            </div>

                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    size: item.size,
                                    quantity: item.quantity + 1,
                                  }),
                                )
                              }
                              className="px-4 py-2 hover:bg-beige-450 transition"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  id: item.id,
                                  size: item.size,
                                }),
                              )
                            }
                            className="text-error-500 text-sm hover:underline"
                          >
                            {itemTranslation?.remove || "Remove"}
                          </button>
                        </div>
                      </div>

                      {/* RIGHT PRICE */}
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary-600">
                          {formatPrice(item.price * item.quantity, locale)}
                        </p>

                        {hasDiscount && (
                          <>
                            <p className="text-sm text-text-disabled line-through mt-1">
                              {formatPrice(
                                item.oldPrice * item.quantity,
                                locale,
                              )}
                            </p>

                            <p className="text-xs text-success-600 mt-1 font-medium">
                              {itemTranslation?.save || "Save"}{" "}
                              {formatPrice(
                                (item.oldPrice - item.price) * item.quantity,
                                locale,
                              )}
                            </p>
                          </>
                        )}

                        <p className="text-sm text-text-muted mt-2">
                          {formatPrice(item.price, locale)}{" "}
                          {itemTranslation?.each || "each"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= SUMMARY ================= */}

          <div className="bg-white rounded-2xl p-8 border border-beige-500 shadow-lg sticky top-32">
            <h2 className="text-xl font-semibold mb-8">
              {summary?.title || "Order Summary"}
            </h2>

            <div className="flex justify-between text-sm mb-4">
              <span className="text-text-muted">
                {summary?.items || "Items"} ({totalQuantity})
              </span>
              <span>{formatPrice(total, locale)}</span>
            </div>

            {totalSavings > 0 && (
              <div className="flex justify-between text-sm mb-4 text-success-600 font-medium">
                <span>{summary?.totalSavings || "Total Savings"}</span>
                <span>- {formatPrice(totalSavings, locale)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm text-text-muted mb-6">
              <span>{summary?.delivery || "Delivery"}</span>
              <span className="text-success-600 font-medium">
                {summary?.free || "Free"}
              </span>
            </div>

            <div className="border-t border-beige-500 my-6" />

            <div className="flex justify-between items-center text-2xl font-bold">
              <span>{summary?.total || "Total"}</span>
              <span className="text-primary-600">
                {formatPrice(total, locale)}
              </span>
            </div>

            <p className="text-xs text-text-disabled mt-6">
              {summary?.secure || "Secure checkout. Taxes included."}
            </p>

            <button
              onClick={() => router.push(`/${locale}/checkout`)}
              className="w-full mt-8 bg-primary-600 text-white py-4 rounded-xl
              hover:bg-primary-700 transition duration-300
              shadow-md hover:shadow-lg text-lg font-medium"
            >
              {summary?.checkout || "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
