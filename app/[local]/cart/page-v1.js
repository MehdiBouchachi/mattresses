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
import { usePathname, useRouter } from "next/navigation";

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price || 0) + " DA";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);

  const totalSavings = items.reduce((acc, item) => {
    if (item.oldPrice && item.oldPrice > item.price) {
      return acc + (item.oldPrice - item.price) * item.quantity;
    }
    return acc;
  }, 0);

  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-beige-100">
        <h1 className="text-3xl font-semibold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven’t added anything yet.
        </p>
        <button
          onClick={() => router.back()}
          className="text-primary-600 font-medium hover:underline"
        >
          ← Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-beige-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* HEADER */}
        <div className="mb-16">
          <button
            onClick={() => router.back()}
            className="text-sm text-primary-600 hover:underline mb-5"
          >
            ← Continue Shopping
          </button>

          <h1 className="text-4xl font-semibold tracking-tight">Your Cart</h1>
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

                        <p className="text-sm text-gray-500 mb-6">
                          Size: {item.size}
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
                            className="text-red-500 text-sm hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* RIGHT PRICE */}
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary-600">
                          {formatPrice(item.price * item.quantity)}
                        </p>

                        {hasDiscount && (
                          <>
                            <p className="text-sm text-gray-400 line-through mt-1">
                              {formatPrice(item.oldPrice * item.quantity)}
                            </p>

                            <p className="text-xs text-green-600 mt-1 font-medium">
                              Save{" "}
                              {formatPrice(
                                (item.oldPrice - item.price) * item.quantity,
                              )}
                            </p>
                          </>
                        )}

                        <p className="text-sm text-gray-500 mt-2">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= SUMMARY ================= */}

          <div className="bg-white rounded-2xl p-8 border top-32 sticky border-beige-500 shadow-lg">
            <h2 className="text-xl font-semibold mb-8">Order Summary</h2>

            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-600">Items ({totalQuantity})</span>
              <span>{formatPrice(total)}</span>
            </div>

            {totalSavings > 0 && (
              <div className="flex justify-between text-sm mb-4 text-green-600 font-medium">
                <span>Total Savings</span>
                <span>- {formatPrice(totalSavings)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm text-gray-600 mb-6">
              <span>Delivery</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="border-t border-beige-500 my-6" />

            <div className="flex justify-between items-center text-2xl font-bold">
              <span>Total</span>
              <span className="text-primary-600">{formatPrice(total)}</span>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              Secure checkout. Taxes included.
            </p>

            <button
              onClick={() => router.push(`/${locale}/checkout`)}
              className="w-full mt-8 bg-primary-600 text-white py-4 rounded-xl
                  hover:bg-primary-700 transition duration-300
                  shadow-md hover:shadow-lg text-lg font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
