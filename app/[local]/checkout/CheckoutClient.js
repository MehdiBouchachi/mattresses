"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { checkoutOrderAction } from "@/lib/actions";
import BackTitle from "@/components/ui/BackTitle";
import OrderSummary from "@/components/features/checkout/OrderSummary";
import CheckoutForm from "@/components/features/checkout/CheckoutForm";

export default function CheckoutClient({ locale, translation = {} }) {
  const router = useRouter();
  const dispatch = useDispatch();

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

  const { header, contact, shipping, payment, button, summary } = translation;

  /* ================= DATA ================= */

  const data = {
    locale,
    items,
    total,
    form,
    isSubmitting,
  };

  /* ================= ACTIONS ================= */

  const actions = {
    change: (e) =>
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),

    submit: async () => {
      const { firstName, lastName, phone, wilaya, city, street } = form;

      if (!firstName || !lastName || !phone || !wilaya || !city || !street) {
        alert("Please fill all required fields.");
        return;
      }

      if (!items.length) {
        alert("Your cart is empty.");
        return;
      }

      setIsSubmitting(true);

      try {
        const orderData = {
          customer: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
          },

          shipping: {
            wilaya: form.wilaya,
            city: form.city,
            street: form.street,
            mapLink: form.mapLink,
          },

          payment: {
            method: "cash_on_delivery",
            status: "pending",
          },

          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            size: item.size,
            thickness: item.thickness,
            density: item.density || null,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
          })),

          summary: {
            itemsCount: items.length,
            totalQuantity: items.reduce((t, i) => t + i.quantity, 0),
            totalPrice: total,
          },

          status: "unconfirmed",
        };

        const result = await checkoutOrderAction(orderData);

       if (result.success) {
  localStorage.setItem("lastOrderCode", result.orderCode);
  dispatch(clearCart());
  router.push(`/${locale}/order-success`);
}
      } catch (error) {
        console.error("[checkout]", error.message);
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },

    back: () => router.back(),
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div
        className="
          relative
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          pt-24 sm:pt-28 lg:pt-36 pb-10 sm:pb-14 lg:pb-16
        "
      >
        {/* Header */}
        <BackTitle
          locale={locale}
          onBack={actions.back}
          title={header.title}
          backLabel={header.back}
        />

        {/* Layout */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1.15fr_0.85fr]
            gap-8 sm:gap-10 lg:gap-16
            items-start
            mt-6 sm:mt-8
          "
        >
          {/* LEFT — FORM */}
          <div className="order-2 lg:order-1">
            <CheckoutForm
              data={data}
              actions={actions}
              i18n={{ contact, shipping, payment, button }}
            />
          </div>

          {/* RIGHT — SUMMARY */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            <OrderSummary data={data} i18n={summary} />
          </div>
        </div>
      </div>
    </div>
  );
}
