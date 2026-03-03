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
      rounded-xl sm:rounded-2xl
      p-5 sm:p-6 lg:p-8
      border border-blue-100
      shadow-[0_15px_40px_rgba(0,0,0,0.05)]
      lg:sticky lg:top-24
    "
    >
      {/* TITLE */}
      <h2 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-blue-950">
        {title}
      </h2>

      {/* ITEMS */}
      <div className="flex justify-between text-xs sm:text-sm mb-3 sm:mb-4">
        <span className="text-slate-500">
          {items} ({totalQuantity})
        </span>

        <span className="text-blue-950 font-medium">
          {formatPrice(total, locale)}
        </span>
      </div>

      {/* SAVINGS */}
      {totalSavings > 0 && (
        <div className="flex justify-between text-xs sm:text-sm mb-3 sm:mb-4 text-red-600 font-semibold">
          <span>{savingsLabel}</span>
          <span>- {formatPrice(totalSavings, locale)}</span>
        </div>
      )}

      {/* DELIVERY */}
      <div className="flex justify-between text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
        <span>{delivery}</span>
        <span className="text-blue-950 font-medium">{free}</span>
      </div>

      <div className="border-t border-blue-100 my-5 sm:my-6" />

      {/* TOTAL */}
      <div className="flex justify-between items-center">
        <span className="text-base sm:text-lg font-semibold text-blue-950">
          {totalLabel}
        </span>

        <span className="text-xl sm:text-2xl font-bold text-blue-900">
          {formatPrice(total, locale)}
        </span>
      </div>

      {/* CTA */}
      <Button
        className="mt-6 sm:mt-8"
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
