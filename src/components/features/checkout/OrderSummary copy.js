import { formatPrice } from "@/utils/helpers";

function OrderSummary({ data, i18n }) {
  const { items, total, locale } = data;
  const { title } = i18n;

  return (
    <div
      className="
        bg-white
        rounded-xl sm:rounded-2xl lg:rounded-3xl
        p-5 sm:p-6 lg:p-10
        h-fit
        lg:sticky lg:top-24
        shadow-[0_20px_50px_rgba(0,0,0,0.05)]
        border border-blue-100
      "
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-blue-950">
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
    <div className="space-y-6 sm:space-y-8">
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
  const { name, quantity, price } = item;

  return (
    <div className="pb-5 sm:pb-6 border-b border-blue-100 last:border-none last:pb-0">
      <div className="flex justify-between items-start gap-4 sm:gap-6">
        <div className="flex-1">
          <p className="font-semibold text-sm sm:text-base text-blue-950 leading-snug">
            {name}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs sm:text-sm text-slate-500">
              {item.size}
              {item.thickness && ` × ${item.thickness} cm`}
            </span>

            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold">
              × {quantity}
            </span>
          </div>
        </div>

        <p className="font-semibold text-sm sm:text-base whitespace-nowrap text-blue-900">
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
        mt-8 sm:mt-10
        pt-6 sm:pt-8
        border-t border-blue-100
        space-y-4 sm:space-y-6
      "
    >
      <div className="flex justify-between text-xs sm:text-sm text-slate-500">
        <span>{subtotal}</span>
        <span>{formatPrice(total, locale)}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-base sm:text-lg font-semibold text-blue-950">
          {totalLabel}
        </span>

        <span className="text-lg sm:text-2xl font-bold text-blue-950">
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
        mt-8 sm:mt-10
        pt-6 sm:pt-8
        border-t border-blue-100
        text-xs sm:text-sm
        text-slate-500
        space-y-2 sm:space-y-3
      "
    >
      <p>{secure1}</p>
      <p>{secure2}</p>
      <p>{secure3}</p>
    </div>
  );
}
