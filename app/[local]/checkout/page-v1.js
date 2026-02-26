"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "@/store/slices/cartSlice";
import { useParams, useRouter } from "next/navigation";

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-DZ").format(price) + " DA";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const locale = params?.locale || "en";
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.wilaya ||
      !form.city ||
      !form.street
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      id: "LTM-" + Math.floor(100000 + Math.random() * 900000),
      total,
      items,
      customer: form,
      date: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    setTimeout(() => {
      dispatch(clearCart());
      router.push(`/${locale}/order-success`);
    }, 800);
  };

  return (
    <div className="bg-beige-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* HEADER */}
        <div className="mb-14">
          <button
            onClick={() => router.back()}
            className="text-sm text-primary-600 hover:underline mb-4"
          >
            ← Back to Cart
          </button>

          <h1 className="text-4xl font-semibold tracking-tight">
            Secure Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-12">
            {/* CONTACT */}
            <section className="space-y-5">
              <h2 className="text-lg font-semibold">Contact Information</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-beige-500 bg-white
                  focus:border-primary-600 focus:ring-1 focus:ring-primary-600
                  outline-none transition"
                />

                <input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-beige-500 bg-white
                  focus:border-primary-600 focus:ring-1 focus:ring-primary-600
                  outline-none transition"
                />
              </div>

              <input
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-beige-500 bg-white
                focus:border-primary-600 focus:ring-1 focus:ring-primary-600
                outline-none transition"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-beige-500 bg-white
                focus:border-primary-600 focus:ring-1 focus:ring-primary-600
                outline-none transition"
              />
            </section>

            {/* SHIPPING */}
            <section className="space-y-5">
              <h2 className="text-lg font-semibold">Shipping Address</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="wilaya"
                  placeholder="Wilaya"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-beige-500 bg-white
                  focus:border-primary-600 focus:ring-1 focus:ring-primary-600
                  outline-none transition"
                />

                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-beige-500 bg-white
                  focus:border-primary-600 focus:ring-1 focus:ring-primary-600
                  outline-none transition"
                />
              </div>

              <input
                name="street"
                placeholder="Street Address"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-beige-500 bg-white
                focus:border-primary-600 focus:ring-1 focus:ring-primary-600
                outline-none transition"
              />

              <input
                name="mapLink"
                placeholder="Google Maps Link (optional)"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-beige-500 bg-white
                focus:border-primary-600 focus:ring-1 focus:ring-primary-600
                outline-none transition"
              />
            </section>

            {/* PAYMENT */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Payment Method</h2>

              <div className="border border-beige-500 rounded-xl p-6 bg-white">
                <p className="font-medium">Cash on Delivery</p>
                <p className="text-sm text-text-muted mt-1">
                  Pay securely when your order is delivered.
                </p>
              </div>
            </section>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white py-4 rounded-xl
              hover:bg-primary-700 transition duration-300
              shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {isSubmitting ? "Processing..." : "Complete Order"}
            </button>
          </div>

          {/* ================= RIGHT SIDE (STICKY) ================= */}
          <div
            className="bg-white rounded-[36px] p-12 h-fit sticky top-28
          shadow-[0_30px_80px_rgba(0,0,0,0.07)]
          border border-beige-500"
          >
            <h2 className="text-xl font-semibold mb-12 tracking-tight">
              Order Summary
            </h2>

            <div className="space-y-10">
              {items.map((item) => (
                <div
                  key={item.id + item.size}
                  className="pb-8 border-b border-beige-500 last:border-none last:pb-0"
                >
                  <div className="flex justify-between items-start gap-6">
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold text-base leading-tight">
                        {item.name}
                      </p>

                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {item.size}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-primary-600/10 text-primary-600 text-[11px] font-semibold tracking-wide">
                          × {item.quantity}
                        </span>
                      </div>
                    </div>

                    <p className="font-semibold text-base whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-beige-500 space-y-5">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total</span>

                <span className="text-2xl font-bold text-primary-600">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="mt-6 pt-6 border-t border-beige-500 text-sm text-text-muted space-y-2">
                <p>✓ Secure order processing</p>
                <p>✓ Phone confirmation before delivery</p>
                <p>✓ 10-year mattress warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
