import { formatPrice } from "@/utils/helpers";

function OrderSummary({ data, i18n }) {
  const { items, total, locale } = data;
  const { title } = i18n;

  return (
    <div
      className="
        bg-white
        rounded-2xl sm:rounded-3xl lg:rounded-[36px]
        p-6 sm:p-8 lg:p-12
        h-fit
        lg:sticky lg:top-28
        shadow-lg sm:shadow-xl lg:shadow-[0_30px_80px_rgba(0,0,0,0.07)]
        border border-beige-500
      "
    >
      <h2
        className="
          text-lg sm:text-xl
          font-semibold
          mb-6 sm:mb-8 lg:mb-12
          tracking-tight
        "
      >
        {title}
      </h2>

      <SummaryItems items={items} locale={locale} />

      <SummaryTotals total={total} locale={locale} i18n={i18n} />

      <SummarySecureNotes i18n={i18n} />
    </div>
  );
}

export default OrderSummary;

/* =====================================================
   ITEMS LIST
===================================================== */

function SummaryItems({ items, locale }) {
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {items.map((item) => (
        <SummaryItem key={item.id + item.size} item={item} locale={locale} />
      ))}
    </div>
  );
}

/* =====================================================
   SINGLE ITEM
===================================================== */

function SummaryItem({ item, locale }) {
  const { id, size, name, quantity, price } = item;

  return (
    <div className="pb-6 sm:pb-8 border-b border-beige-500 last:border-none last:pb-0">
      <div className="flex justify-between items-start gap-4 sm:gap-6">
        <div>
          <p className="font-semibold text-sm sm:text-base leading-tight">
            {name}
          </p>

          <div className="flex items-center gap-2 sm:gap-3 mt-2">
            <span className="text-xs sm:text-sm text-text-muted">{size}</span>

            <span
              className="
                px-2 sm:px-3
                py-1
                rounded-full
                bg-primary-600/10
                text-primary-600
                text-[10px] sm:text-[11px]
                font-semibold
              "
            >
              × {quantity}
            </span>
          </div>
        </div>

        <p className="font-semibold text-sm sm:text-base whitespace-nowrap">
          {formatPrice(price * quantity, locale)}
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   TOTALS SECTION
===================================================== */

function SummaryTotals({ total, locale, i18n }) {
  const { subtotal, total: totalLabel } = i18n;

  return (
    <div
      className="
        mt-8 sm:mt-10 lg:mt-12
        pt-6 sm:pt-8
        border-t border-beige-500
        space-y-4 sm:space-y-5
      "
    >
      <div className="flex justify-between text-text-muted text-xs sm:text-sm">
        <span>{subtotal}</span>
        <span>{formatPrice(total, locale)}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg sm:text-xl font-semibold">{totalLabel}</span>

        <span className="text-xl sm:text-2xl font-bold text-primary-600">
          {formatPrice(total, locale)}
        </span>
      </div>
    </div>
  );
}

/* =====================================================
   SECURE NOTES
===================================================== */

function SummarySecureNotes({ i18n }) {
  const { secure1, secure2, secure3 } = i18n;

  return (
    <div
      className="
        mt-6 sm:mt-8
        pt-6
        border-t border-beige-500
        text-xs sm:text-sm
        text-text-muted
        space-y-2
      "
    >
      <p>{secure1}</p>
      <p>{secure2}</p>
      <p>{secure3}</p>
    </div>
  );
}
