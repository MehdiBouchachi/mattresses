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
        border border-beige-500
        shadow-md sm:shadow-lg
        lg:sticky lg:top-32
      "
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">{title}</h2>

      {/* Items Row */}
      <div className="flex justify-between text-xs sm:text-sm mb-3 sm:mb-4">
        <span className="text-text-muted">
          {items} ({totalQuantity})
        </span>
        <span>{formatPrice(total, locale)}</span>
      </div>

      {/* Savings */}
      {totalSavings > 0 && (
        <div className="flex justify-between text-xs sm:text-sm mb-3 sm:mb-4 text-success-600 font-medium">
          <span>{savingsLabel}</span>
          <span>- {formatPrice(totalSavings, locale)}</span>
        </div>
      )}

      {/* Delivery */}
      <div className="flex justify-between text-xs sm:text-sm text-text-muted mb-5 sm:mb-6">
        <span>{delivery}</span>
        <span className="text-success-600 font-medium">{free}</span>
      </div>

      <div className="border-t border-beige-500 my-5 sm:my-6" />

      {/* Total */}
      <div className="flex justify-between items-center text-lg sm:text-xl lg:text-2xl font-bold">
        <span>{totalLabel}</span>
        <span className="text-primary-600">{formatPrice(total, locale)}</span>
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
