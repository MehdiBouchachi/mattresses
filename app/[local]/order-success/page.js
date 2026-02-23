"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function OrderSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrder(JSON.parse(saved));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-beige-100 pt-40 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full
                          bg-primary-600 flex items-center justify-center
                          text-white text-xl shadow-md"
          >
            ✓
          </div>

          <h1 className="text-3xl font-semibold mb-3 tracking-tight">
            Order Confirmed
          </h1>

          <p className="text-gray-500">
            Your order has been placed successfully.
          </p>
        </div>

        {/* CARD */}
        <div
          className="bg-white rounded-[28px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                        border border-beige-500"
        >
          {/* ORDER INFO */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Order Number
              </p>
              <p className="text-lg font-semibold mt-1">{order.id}</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Total
              </p>
              <p className="text-xl font-bold text-primary-600 mt-1">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="space-y-6 mb-8">
            {order.items.map((item) => (
              <div
                key={item.id + item.size}
                className="flex justify-between items-start border-b pb-4 last:border-none"
              >
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.size} × {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-sm">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* INFO BOX */}
          <div className="bg-beige-100 rounded-xl p-5 mb-8 text-sm text-gray-600">
            We will contact you shortly to confirm delivery.
            <br />
            Payment method:{" "}
            <span className="font-medium">Cash on Delivery</span>.
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push("/")}
            className="w-full bg-primary-600 text-white py-4 rounded-full
                       hover:opacity-90 transition text-sm font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
