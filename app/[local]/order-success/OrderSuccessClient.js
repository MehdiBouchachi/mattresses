"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/helpers";
import Button from "@/components/ui/Button";

export default function OrderSuccessClient({ locale, translation }) {
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

  const { header, details, infoBox, button } = translation;

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 pt-24 lg:pt-32 pb-16 sm:pb-20">
      <div className="max-w-2xl mx-auto">
        <SuccessHeader header={header} />
        <SuccessCard
          locale={locale}
          order={order}
          details={details}
          infoBox={infoBox}
          buttonLabel={button}
          onHome={() => router.push(`/${locale}`)}
        />
      </div>
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function SuccessHeader({ header }) {
  return (
    <div className="text-center mb-8 sm:mb-10">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-950 flex items-center justify-center text-white text-xl shadow-md">
        ✓
      </div>

      <h1 className="text-2xl font-semibold mb-2 text-blue-950">
        {header.title}
      </h1>

      <p className="text-sm text-slate-600">{header.description}</p>
    </div>
  );
}

/* =========================================================
   CARD
========================================================= */

function SuccessCard({ locale, order, details, infoBox, buttonLabel, onHome }) {
  const isRTL = locale === "ar";

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6 lg:p-8
        shadow-[0_15px_40px_rgba(0,0,0,0.05)]
        border border-blue-100
      "
      dir={isRTL ? "rtl" : "ltr"}
    >
      <OrderMeta
        locale={locale}
        order={order}
        details={details}
        isRTL={isRTL}
      />

      <OrderItems locale={locale} items={order.items} />

      <InfoBox infoBox={infoBox} />

      <Button variant="cta" size="lg" fullWidth onClick={onHome}>
        {buttonLabel}
      </Button>
    </div>
  );
}

/* =========================================================
   ORDER META
========================================================= */

function OrderMeta({ locale, order, details, isRTL }) {
  return (
    <div className="flex justify-between items-start mb-8 flex-wrap gap-6">
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider">
          {details.orderNumber}
        </p>
        <p className="text-lg font-semibold mt-1 text-blue-950">{order.id}</p>
      </div>

      <div className={isRTL ? "text-left" : "text-right"}>
        <p className="text-xs text-slate-500 uppercase tracking-wider">
          {details.total}
        </p>
        <p className="text-xl font-bold text-blue-900 mt-1">
          {formatPrice(order.summary.totalPrice, locale)}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   ORDER ITEMS
========================================================= */

function OrderItems({ locale, items }) {
  return (
    <div className="space-y-6 mb-8">
      {items.map((item) => (
        <OrderItem
          key={`${item.id}-${item.size}-${item.thickness}-${item.density || "default"}`}
          locale={locale}
          item={item}
        />
      ))}
    </div>
  );
}

function OrderItem({ locale, item }) {
  const { size, name, quantity, price, thickness, density } = item;

  return (
    <div className="flex justify-between items-start border-b border-blue-100 pb-4 last:border-none flex-wrap gap-4">
      <div>
        <p className="font-medium text-sm text-blue-950">{name}</p>

        <div className="text-xs text-slate-600 mt-1 space-y-1">
          {/* Density (Classic only) */}
          {density && <p>{density}</p>}

          <p>
            <span dir="ltr">{size}</span>
            {thickness && (
              <>
                {" × "}
                <span dir="ltr">{thickness} cm</span>
              </>
            )}
            {" × "}
            <span dir="ltr">{quantity}</span>
          </p>
        </div>
      </div>

      <p className="font-semibold text-sm whitespace-nowrap text-blue-900">
        {formatPrice(price * quantity, locale)}
      </p>
    </div>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({ infoBox }) {
  return (
    <div className="bg-blue-50 rounded-2xl p-5 mb-8 text-sm text-slate-600 leading-relaxed border border-blue-100">
      {infoBox.text}
      <br />
      {infoBox.payment}{" "}
      <span className="font-medium text-blue-900">{infoBox.paymentMethod}</span>
      .
    </div>
  );
}
