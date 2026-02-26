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

  return (
    <div className="bg-white rounded-2xl p-8 border border-beige-500 shadow-lg sticky top-32">
      <h2 className="text-xl font-semibold mb-8">{title}</h2>

      <div className="flex justify-between text-sm mb-4">
        <span className="text-text-muted">
          {items} ({totalQuantity})
        </span>
        <span>{formatPrice(total, locale)}</span>
      </div>

      {totalSavings > 0 && (
        <div className="flex justify-between text-sm mb-4 text-success-600 font-medium">
          <span>{savingsLabel}</span>
          <span>- {formatPrice(totalSavings, locale)}</span>
        </div>
      )}

      <div className="flex justify-between text-sm text-text-muted mb-6">
        <span>{delivery}</span>
        <span className="text-success-600 font-medium">{free}</span>
      </div>

      <div className="border-t border-beige-500 my-6" />

      <div className="flex justify-between items-center text-2xl font-bold">
        <span>{totalLabel}</span>
        <span className="text-primary-600">{formatPrice(total, locale)}</span>
      </div>

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
