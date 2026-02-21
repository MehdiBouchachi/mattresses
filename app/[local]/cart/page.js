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
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function CartPage() {
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const router = useRouter();
  const pathname = usePathname();

  const locale = pathname.split("/")[1]; // gets 'en'
  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-4xl font-semibold mb-4">Your Cart is Empty</h1>

        <p className="text-gray-500 mb-10">
          Looks like you haven’t added anything yet.
        </p>

        <button
          onClick={() => router.back()}
          className="mb-4 text-sm text-[#2B2D6E] hover:underline"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-40 pb-24 px-8">
      <button
        onClick={() => router.back()}
        className="mb-10 text-sm text-[#2B2D6E] hover:underline"
      >
        ← Continue Shopping
      </button>

      <h1 className="text-4xl font-semibold mb-16">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* ================= LEFT - ITEMS ================= */}
        <div className="lg:col-span-2 space-y-10">
          {items.map((item) => (
            <div
              key={item.id + item.size}
              className="flex gap-8 border-b pb-10"
            >
              {/* IMAGE */}
              <div className="w-40 h-40 relative rounded-2xl overflow-hidden bg-white border">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 flex justify-between">
                <div>
                  <h3 className="text-xl font-medium mb-2">{item.name}</h3>

                  <p className="text-sm text-gray-500 mb-6">
                    Size: {item.size}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center border rounded-full w-fit overflow-hidden">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity({
                            id: item.id,
                            size: item.size,
                          }),
                        )
                      }
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      −
                    </button>

                    <div className="px-6 font-medium">{item.quantity}</div>

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
                      className="px-4 py-2 hover:bg-gray-100 transition"
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
                    className="text-red-500 text-sm mt-6 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* SUBTOTAL */}
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    {formatPrice(item.price)} each
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT - SUMMARY ================= */}
        <div className="bg-white border border-[#E9E2D8] rounded-3xl p-12 h-fit sticky top-28 shadow-lg">
          <h2 className="text-2xl font-semibold mb-10">Order Summary</h2>

          {/* ITEMS COUNT */}
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-600">
              Items ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </span>
            <span>{formatPrice(total)}</span>
          </div>

          {/* SHIPPING */}
          <div className="flex justify-between text-sm text-gray-600 mb-6">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-[#E9E2D8] my-6" />

          {/* TOTAL */}
          <div className="flex justify-between items-center text-xl font-semibold">
            <span>Total</span>
            <span className="text-[#2B2D6E]">{formatPrice(total)}</span>
          </div>

          {/* SECURE MESSAGE */}
          <p className="text-xs text-gray-400 mt-6">
            Secure checkout. Taxes included.
          </p>

          {/* CTA */}
          <button
            onClick={() => router.push(`/${locale}/checkout`)}
            className="w-full mt-10 bg-[#2B2D6E] text-white py-5 rounded-full hover:opacity-90 transition text-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
