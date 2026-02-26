"use client";

import { useState } from "react";
import { formatPrice } from "@/utils/helpers";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

/* =========================================================
   MOCK DATA
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

const STATUS_STYLES = {
  unconfirmed: "bg-gray-200 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  in_delivery: "bg-amber-100 text-amber-700",
  delivered: "bg-green-100 text-green-700",
};

/* =========================================================
   MAIN
========================================================= */

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
    <div className="min-h-screen bg-beige-100 px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
        <TrackingHeader header={t.header} />

        <TrackingSearch
          t={t}
          orderId={orderId}
          setOrderId={setOrderId}
          onTrack={handleTrack}
          error={error}
        />

        {order && (
          <TrackingResult
            order={order}
            t={t}
            locale={locale}
            currentIndex={currentIndex}
            isRTL={isRTL}
          />
        )}
      </div>
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function TrackingHeader({ header }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        {header.title}
      </h1>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-text-muted">
        {header.description}
      </p>
    </div>
  );
}

/* =========================================================
   SEARCH
========================================================= */

function TrackingSearch({ t, orderId, setOrderId, onTrack, error }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-beige-500">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          name="orderId"
          placeholder={t.search.placeholder}
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <Button
          variant="cta"
          size="md"
          onClick={onTrack}
          className=" w-full sm:w-auto
    sm:min-w-[140px]
  "
        >
          {t.search.button}
        </Button>
      </div>

      {error && <p className="mt-4 text-sm text-error-500">{error}</p>}
    </div>
  );
}

/* =========================================================
   RESULT
========================================================= */

function TrackingResult({ order, t, locale, currentIndex, isRTL }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-beige-500 space-y-10">
      <OrderInfo order={order} t={t} locale={locale} />

      <TrackingProgress
        steps={t.steps}
        currentIndex={currentIndex}
        isRTL={isRTL}
      />

      <StatusMessage message={t.messages[order.status]} />
    </div>
  );
}

/* =========================================================
   ORDER INFO
========================================================= */

function OrderInfo({ order, t, locale }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-6 flex-wrap">
      <InfoBlock label={t.details.orderId} value={order.id} />
      <InfoBlock label={t.details.customer} value={order.customer} />
      <InfoBlock
        label={t.details.total}
        value={formatPrice(order.total, locale)}
      />

      <span
        className={`
    inline-flex items-center justify-center
    px-3 sm:px-4
    py-1.5
    rounded-full
    text-[11px] sm:text-sm
    font-medium
    whitespace-nowrap
    self-start
    ${STATUS_STYLES[order.status]}
  `}
      >
        {t.status[order.status]}
      </span>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs text-text-muted">{label}</p>
      <p className="font-medium text-sm sm:text-base mt-1">{value}</p>
    </div>
  );
}

/* =========================================================
   PROGRESS
========================================================= */
function TrackingProgress({ steps, currentIndex, isRTL }) {
  const entries = Object.entries(steps);

  return (
    <>
      {/* ================= DESKTOP (Horizontal) ================= */}
      <div className="hidden sm:block relative">
        <div className="flex justify-between items-center">
          {entries.map(([key, label], index) => {
            const active = index <= currentIndex;

            return (
              <div
                key={key}
                className="flex-1 flex flex-col items-center relative"
              >
                {index !== 0 && (
                  <div
                    className={`absolute top-3 w-full h-[2px] ${
                      active ? "bg-primary-600" : "bg-beige-400"
                    } ${isRTL ? "-right-1/2" : "-left-1/2"}`}
                  />
                )}

                <div
                  className={`w-6 h-6 rounded-full z-10 ${
                    active ? "bg-primary-600" : "bg-beige-400"
                  }`}
                />

                <p
                  className={`mt-3 text-xs text-center ${
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

      {/* ================= MOBILE (Vertical Timeline) ================= */}
      <div className="sm:hidden space-y-6 relative">
        {entries.map(([key, label], index) => {
          const active = index <= currentIndex;

          return (
            <div key={key} className="flex items-start gap-4 relative">
              {/* Line */}
              {index !== entries.length - 1 && (
                <div
                  className={`absolute ${
                    isRTL ? "right-3" : "left-3"
                  } top-6 w-[2px] h-full ${
                    active ? "bg-primary-600" : "bg-beige-400"
                  }`}
                />
              )}

              {/* Circle */}
              <div
                className={`w-6 h-6 rounded-full mt-1 z-10 ${
                  active ? "bg-primary-600" : "bg-beige-400"
                }`}
              />

              {/* Label */}
              <p
                className={`text-xs ${
                  active ? "text-text-primary" : "text-text-muted"
                }`}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =========================================================
   STATUS MESSAGE
========================================================= */

function StatusMessage({ message }) {
  return <div className="text-center text-sm text-text-primary">{message}</div>;
}
