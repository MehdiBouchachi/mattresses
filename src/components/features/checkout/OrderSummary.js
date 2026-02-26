import { formatPrice } from "@/utils/helpers";

function OrderSummary({ data, i18n }) {
  const { items, total, locale } = data;
  const { title } = i18n;

  return (
    <div
      className="bg-white rounded-[36px] p-12 h-fit sticky top-28
      shadow-[0_30px_80px_rgba(0,0,0,0.07)]
      border border-beige-500"
    >
      <h2 className="text-xl font-semibold mb-12 tracking-tight">{title}</h2>

      <SummaryItems items={items} locale={locale} />

      <SummaryTotals total={total} locale={locale} i18n={i18n} />

      <SummarySecureNotes i18n={i18n} />
    </div>
  );
}

export default OrderSummary;

/*
   ITEMS LIST
*/

function SummaryItems({ items, locale }) {
  return (
    <div className="space-y-10">
      {items.map((item) => (
        <SummaryItem key={item.id + item.size} item={item} locale={locale} />
      ))}
    </div>
  );
}

/*
   SINGLE ITEM
*/

function SummaryItem({ item, locale }) {
  const { id, size, name, quantity, price } = item;

  return (
    <div className="pb-8 border-b border-beige-500 last:border-none last:pb-0">
      <div className="flex justify-between items-start gap-6">
        <div>
          <p className="font-semibold text-base leading-tight">{name}</p>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-text-muted">{size}</span>

            <span className="px-3 py-1 rounded-full bg-primary-600/10 text-primary-600 text-[11px] font-semibold">
              × {quantity}
            </span>
          </div>
        </div>

        <p className="font-semibold text-base whitespace-nowrap">
          {formatPrice(price * quantity, locale)}
        </p>
      </div>
    </div>
  );
}

/*
   TOTALS SECTION
*/

function SummaryTotals({ total, locale, i18n }) {
  const { subtotal, total: totalLabel } = i18n;

  return (
    <div className="mt-12 pt-8 border-t border-beige-500 space-y-5">
      <div className="flex justify-between text-text-muted text-sm">
        <span>{subtotal}</span>
        <span>{formatPrice(total, locale)}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold">{totalLabel}</span>

        <span className="text-2xl font-bold text-primary-600">
          {formatPrice(total, locale)}
        </span>
      </div>
    </div>
  );
}

/*
   SECURE NOTES
*/

function SummarySecureNotes({ i18n }) {
  const { secure1, secure2, secure3 } = i18n;

  return (
    <div className="mt-6 pt-6 border-t border-beige-500 text-sm text-text-muted space-y-2">
      <p>{secure1}</p>
      <p>{secure2}</p>
      <p>{secure3}</p>
    </div>
  );
}
