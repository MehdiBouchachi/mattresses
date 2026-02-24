"use client";

import { useState } from "react";

/* =========================================================
   MOCK ORDERS DATABASE
   Replace later with API call
========================================================= */

const MOCK_ORDERS = [
  {
    id: "LIT-10001",
    customer: "Amine B.",
    total: 145000,
    status: "unconfirmed",
    date: "2026-02-20",
  },
  {
    id: "LIT-10002",
    customer: "Sarah K.",
    total: 165000,
    status: "confirmed",
    date: "2026-02-21",
  },
  {
    id: "LIT-10003",
    customer: "Yacine M.",
    total: 185000,
    status: "in_delivery",
    date: "2026-02-22",
  },
  {
    id: "LIT-10004",
    customer: "Nadia R.",
    total: 195000,
    status: "delivered",
    date: "2026-02-23",
  },
];

/* =========================================================
   STATUS CONFIG
========================================================= */

const STATUS_CONFIG = {
  unconfirmed: {
    label: "Unconfirmed",
    badge: "bg-gray-200 text-gray-700",
  },
  confirmed: {
    label: "Confirmed",
    badge: "bg-blue-100 text-blue-700",
  },
  in_delivery: {
    label: "In Delivery",
    badge: "bg-amber-100 text-amber-700",
  },
  delivered: {
    label: "Delivered",
    badge: "bg-green-100 text-green-700",
  },
};

const STEPS = [
  { key: "unconfirmed", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in_delivery", label: "In Delivery" },
  { key: "delivered", label: "Delivered" },
];

/* =========================================================
   PAGE
========================================================= */

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = () => {
    const formattedId = orderId.trim().toUpperCase();

    const found = MOCK_ORDERS.find((o) => o.id === formattedId);

    if (!found) {
      setOrder(null);
      setError("Order not found. Please verify your ID.");
      return;
    }

    setError("");
    setOrder(found);
  };

  return (
    <div className="min-h-screen bg-beige-100 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary">
            Track Your Order
          </h1>
          <p className="mt-4 text-text-muted text-lg">
            Enter your order number to check the current delivery status.
          </p>
        </div>

        {/* ================= SEARCH CARD ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Example: LIT-10003"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 border border-beige-600 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition"
            />

            <button
              onClick={handleTrack}
              className="px-6 py-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition"
            >
              Track Order
            </button>
          </div>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>

        {/* ================= RESULT ================= */}
        {order && (
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            {/* ORDER INFO */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
              <div className="space-y-1">
                <p className="text-sm text-text-muted">Order ID</p>
                <p className="text-lg font-medium text-text-primary">
                  {order.id}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-text-muted">Customer</p>
                <p className="text-text-primary">{order.customer}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-text-muted">Total</p>
                <p className="text-text-primary font-medium">
                  {new Intl.NumberFormat("fr-DZ").format(order.total)} DA
                </p>
              </div>

              <div className="flex justify-center md:justify-start">
                <span
                  className={`
      inline-flex items-center justify-center
      px-5 py-2.5
      rounded-full
      text-xs md:text-sm
      font-medium
      tracking-wide
      shadow-sm
      transition-all
      ${STATUS_CONFIG[order.status].badge}
    `}
                >
                  {STATUS_CONFIG[order.status].label}
                </span>
              </div>
            </div>

            {/* ================= PROGRESS TRACKER ================= */}
            <div className="relative">
              <div className="flex justify-between items-center">
                {STEPS.map((step, index) => {
                  const currentIndex = STEPS.findIndex(
                    (s) => s.key === order.status,
                  );
                  const active = index <= currentIndex;

                  return (
                    <div
                      key={step.key}
                      className="flex-1 flex flex-col items-center relative"
                    >
                      {/* Line */}
                      {index !== 0 && (
                        <div
                          className={`absolute top-3 -left-1/2 w-full h-[2px] ${
                            index <= currentIndex
                              ? "bg-primary-600"
                              : "bg-beige-400"
                          }`}
                        />
                      )}

                      {/* Circle */}
                      <div
                        className={`w-6 h-6 rounded-full z-10 ${
                          active ? "bg-primary-600" : "bg-beige-400"
                        }`}
                      />

                      {/* Label */}
                      <p
                        className={`mt-4 text-xs md:text-sm text-center ${
                          active ? "text-text-primary" : "text-text-muted"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= STATUS MESSAGE ================= */}
            <div className="mt-12 text-center text-sm">
              {order.status === "unconfirmed" && (
                <p className="text-gray-600">
                  Your order has been received and is awaiting confirmation.
                </p>
              )}

              {order.status === "confirmed" && (
                <p className="text-blue-600">
                  Your order has been confirmed and is being prepared.
                </p>
              )}

              {order.status === "in_delivery" && (
                <p className="text-amber-600">
                  Your mattress is currently out for delivery.
                </p>
              )}

              {order.status === "delivered" && (
                <p className="text-green-600">
                  Your order has been successfully delivered.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
