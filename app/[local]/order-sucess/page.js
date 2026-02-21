"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCartTotal } from "@/store/slices/cartSlice";
import { useEffect } from "react";

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function OrderSuccessPage() {
  const router = useRouter();
  const total = useSelector(selectCartTotal);

  // Optional: auto redirect if someone lands here manually
  useEffect(() => {
    if (!total) {
      router.push("/");
    }
  }, [total, router]);

  const orderNumber = "LTM-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6">
      <div
        className="bg-white rounded-[40px] shadow-[0_40px_120px_rgba(0,0,0,0.08)]
                      border border-[#E9E2D8]
                      max-w-xl w-full p-16 text-center"
      >
        {/* CHECK ICON */}
        <div
          className="w-20 h-20 mx-auto mb-10 rounded-full 
                        bg-[#2B2D6E]/10 flex items-center justify-center"
        >
          <div className="text-3xl text-[#2B2D6E]">✓</div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold mb-6 tracking-tight">
          Order Confirmed
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-500 mb-10 leading-relaxed">
          Thank you for your purchase. Your order has been successfully placed.
          We will contact you shortly to confirm delivery details.
        </p>

        {/* ORDER DETAILS */}
        <div className="bg-[#F8F6F2] rounded-2xl p-8 mb-10 text-left space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Order Number</span>
            <span className="font-medium">{orderNumber}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium">Cash on Delivery</span>
          </div>

          <div className="flex justify-between text-base font-semibold pt-4 border-t border-[#E9E2D8]">
            <span>Total</span>
            <span className="text-[#2B2D6E]">{formatPrice(total)}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/")}
          className="w-full bg-[#2B2D6E] text-white py-4 rounded-full
                     hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
