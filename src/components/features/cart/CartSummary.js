import Button from "@/components/ui/Button";
import { formatPrice } from "@/utils/helpers";

function CartSummary({ data, actions, i18n = {}, locale }) {
  const { total, totalQuantity, totalSavings } = data;
  const { checkout } = actions;

  const {
    title,
    items,
    totalSavings: savingsLabel,
    delivery,
    free,
    total: totalLabel,
    checkout: checkoutLabel,
  } = i18n;

  const isRTL = locale === "ar";

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6 sm:p-8
        border border-blue-100
        shadow-[0_20px_50px_rgba(0,0,0,0.05)]
        lg:sticky lg:top-32
      "
    >
      <h2 className="text-xl font-semibold mb-8 text-blue-950">{title}</h2>

      {/* ITEMS */}
      <div className="flex justify-between text-sm mb-4">
        <span className="text-slate-500">
          {items} ({totalQuantity})
        </span>

        <span className="text-blue-950 font-medium">
          {formatPrice(total, locale)}
        </span>
      </div>

      {/* SAVINGS */}
      {totalSavings > 0 && (
        <div className="flex justify-between text-sm mb-4 text-red-600 font-semibold">
          <span>{savingsLabel}</span>
          <span>- {formatPrice(totalSavings, locale)}</span>
        </div>
      )}

      {/* DELIVERY */}
      <div className="flex justify-between text-sm text-slate-500 mb-6">
        <span>{delivery}</span>
        <span className="text-blue-950 font-medium">{free}</span>
      </div>

      <div className="border-t border-blue-100 my-6" />

      {/* TOTAL */}
      <div className="flex justify-between items-center text-xl font-bold">
        <span className="text-blue-950">{totalLabel}</span>

        <span className="text-2xl text-blue-900">
          {formatPrice(total, locale)}
        </span>
      </div>

      {/* CTA */}
      <Button
        className="mt-8"
        variant="cta"
        size="lg"
        fullWidth
        onClick={checkout}
      >
        {checkoutLabel}
      </Button>
    </div>
  );
}

export default CartSummary;
