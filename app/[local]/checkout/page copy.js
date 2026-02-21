"use client";

import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    wilaya: "",
    city: "",
    street: "",
    mapLink: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  if (!items.length) {
    router.push("/cart");
  }

  return (
    <div className="bg-[#F8F6F2] min-h-screen">
      <div className="max-w-7xl mx-auto pt-40 pb-24 px-8 grid lg:grid-cols-2 gap-28">
        {/* ================= LEFT - FORM ================= */}
        <div>
          <button
            onClick={() => router.back()}
            className="mb-14 text-sm text-[#2B2D6E] hover:underline"
          >
            ← Back to Cart
          </button>

          <h1 className="text-5xl font-semibold mb-20 tracking-tight">
            Checkout
          </h1>

          <div className="space-y-16">
            {/* CONTACT */}
            <div>
              <h2 className="text-xl font-semibold mb-10">
                Contact Information
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <input
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-[#E9E2D8] bg-white 
                              focus:ring-2 focus:ring-[#2B2D6E] outline-none 
                             focus:border-[#2B2D6E] transition"
                />

                <input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-[#E9E2D8] bg-white 
                              focus:ring-2 focus:ring-[#2B2D6E] outline-none 
                             focus:border-[#2B2D6E] transition"
                />
              </div>

              <div className="mt-6 space-y-6">
                <input
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-[#E9E2D8] bg-white 
                              focus:ring-2 focus:ring-[#2B2D6E] outline-none 
                             focus:border-[#2B2D6E] transition"
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-[#E9E2D8] bg-white 
                              focus:ring-2 focus:ring-[#2B2D6E] outline-none 
                             focus:border-[#2B2D6E] transition"
                />
              </div>
            </div>

            {/* SHIPPING */}
            <div>
              <h2 className="text-xl font-semibold mb-10">Shipping Address</h2>

              <div className="grid grid-cols-2 gap-6">
                <input
                  name="wilaya"
                  placeholder="Wilaya"
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-[#E9E2D8] bg-white 
                              focus:ring-2 focus:ring-[#2B2D6E] outline-none 
                             focus:border-[#2B2D6E] transition"
                />

                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-[#E9E2D8] bg-white 
                              focus:ring-2 focus:ring-[#2B2D6E] outline-none 
                             focus:border-[#2B2D6E] transition"
                />
              </div>

              <div className="mt-6 space-y-6">
                <input
                  name="street"
                  placeholder="Street Address"
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-[#E9E2D8] bg-white 
                              focus:ring-2 focus:ring-[#2B2D6E] outline-none 
                             focus:border-[#2B2D6E] transition"
                />

                <input
                  name="mapLink"
                  placeholder="Google Maps Location (optional)"
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl border border-[#E9E2D8] bg-white 
                              focus:ring-2 focus:ring-[#2B2D6E] outline-none 
                             focus:border-[#2B2D6E] transition"
                />
              </div>
            </div>

            {/* PAYMENT */}
            <div>
              <h2 className="text-xl font-semibold mb-8">Payment Method</h2>

              <div className="border border-[#E9E2D8] rounded-3xl p-8 bg-white shadow-sm">
                <p className="font-medium text-lg">Cash on Delivery</p>
                <p className="text-sm text-gray-400 mt-3">
                  Pay when your order arrives at your address.
                </p>
              </div>
            </div>

            <button
              className="w-full bg-[#2B2D6E] text-white py-5 rounded-full text-lg 
                         hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] 
                         transition-all duration-200"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* ================= RIGHT - SUMMARY ================= */}
        {/* ================= RIGHT - SUMMARY ================= */}
        <div
          className="bg-white rounded-[44px] p-16 h-fit sticky top-28
             shadow-[0_40px_120px_rgba(0,0,0,0.08)]
             border border-[#E9E2D8]"
        >
          <h2 className="text-2xl font-semibold mb-16 tracking-tight">
            Order Summary
          </h2>

          <div className="space-y-14">
            {items.map((item) => (
              <div
                key={item.id + item.size}
                className="pb-10 border-b border-[#F0ECE6] last:border-none last:pb-0"
              >
                <div className="flex justify-between items-start gap-6">
                  {/* LEFT SIDE */}
                  <div className="flex flex-col gap-4">
                    <p className="font-semibold text-lg leading-tight">
                      {item.name}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{item.size}</span>

                      {/* STRONGER QUANTITY BADGE */}
                      <span
                        className="px-4 py-1.5 rounded-full 
                               bg-[#2B2D6E]/10 
                               text-[#2B2D6E] 
                               text-xs font-semibold tracking-wide"
                      >
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* PRICE */}
                  <p className="font-semibold text-lg whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL SECTION */}
          <div className="mt-16 pt-10 border-t border-[#E9E2D8] space-y-6">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold">Total</span>

              <span className="text-3xl font-bold text-[#2B2D6E]">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
