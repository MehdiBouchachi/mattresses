"use client";

import { useState } from "react";
import { formatPrice } from "@/utils/helpers";
/* =========================================================
   MOCK ORDERS DATABASE (Replace later with API)
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
   STATUS BADGE COLORS (labels now come from translation)
========================================================= */

const STATUS_STYLES = {
  unconfirmed: "bg-gray-200 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  in_delivery: "bg-amber-100 text-amber-700",
  delivered: "bg-green-100 text-green-700",
};

export default function OrderTrackingClient({ locale, translation }) {
  const t = translation.orderTrackingPage;
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const isRTL = locale === "ar";
  const handleTrack = () => {
    const formattedId = orderId.trim().toUpperCase();
    const found = MOCK_ORDERS.find((o) => o.id === formattedId);

    if (!found) {
      setOrder(null);
      setError(t.search.error);
      return;
    }

    setError("");
    setOrder(found);
  };

  const currentIndex = order
    ? Object.keys(t.status).findIndex((key) => key === order.status)
    : -1;

  return (
    <div className="min-h-screen bg-beige-100 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary">
            {t.header.title}
          </h1>
          <p className="mt-4 text-text-muted text-lg">{t.header.description}</p>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder={t.search.placeholder}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 border border-beige-600 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition"
            />

            <button
              onClick={handleTrack}
              className="px-6 py-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition"
            >
              {t.search.button}
            </button>
          </div>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>

        {/* ================= RESULT ================= */}
        {order && (
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            {/* ORDER INFO */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
              <div>
                <p className="text-sm text-text-muted">{t.details.orderId}</p>
                <p className="text-lg font-medium text-text-primary">
                  {order.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-text-muted">{t.details.customer}</p>
                <p className="text-text-primary">{order.customer}</p>
              </div>

              <div>
                <p className="text-sm text-text-muted">{t.details.total}</p>
                <p className="text-text-primary font-medium">
                  {formatPrice(order.total)}
                </p>
              </div>

              <div>
                <span
                  className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs md:text-sm font-medium shadow-sm ${STATUS_STYLES[order.status]}`}
                >
                  {t.status[order.status]}
                </span>
              </div>
            </div>

            {/* ================= PROGRESS ================= */}
            <div className="relative">
              <div className="flex justify-between items-center">
                {Object.entries(t.steps).map(([key, label], index) => {
                  const active = index <= currentIndex;

                  return (
                    <div
                      key={key}
                      className="flex-1 flex flex-col items-center relative"
                    >
                      {/* Line */}
                      {index !== 0 && (
                        <div
                          className={`absolute top-3 w-full h-[2px] ${
                            active ? "bg-primary-600" : "bg-beige-400"
                          } ${isRTL ? "-right-1/2" : "-left-1/2"}`}
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
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= STATUS MESSAGE ================= */}
            <div className="mt-12 text-center text-sm">
              <p className="text-text-primary">{t.messages[order.status]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
