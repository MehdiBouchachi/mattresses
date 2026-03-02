import { formatPrice } from "@/utils/helpers";

function OrderSummary({ data, i18n }) {
  const { items, total, locale } = data;
  const { title } = i18n;

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6 sm:p-8 lg:p-12
        h-fit
        lg:sticky lg:top-32
        shadow-[0_30px_70px_rgba(0,0,0,0.05)]
        border border-blue-100
      "
    >
      <h2 className="text-xl font-semibold mb-10 tracking-tight text-blue-950">
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
    <div className="space-y-10">
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
  const { size, name, quantity, price } = item;

  return (
    <div className="pb-8 border-b border-blue-100 last:border-none last:pb-0">
      <div className="flex justify-between items-start gap-6">
        <div>
          <p className="font-semibold text-base text-blue-950 leading-tight">
            {name}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-slate-500">
              {item.size}
              {item.thickness && ` × ${item.thickness} cm`}
            </span>

            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-950 text-xs font-semibold">
              × {item.quantity}
            </span>
          </div>
        </div>

        <p className="font-semibold text-base whitespace-nowrap text-blue-950">
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
        mt-12
        pt-8
        border-t border-blue-100
        space-y-6
      "
    >
      <div className="flex justify-between text-slate-500 text-sm">
        <span>{subtotal}</span>
        <span>{formatPrice(total, locale)}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold text-blue-950">
          {totalLabel}
        </span>

        <span className="text-2xl font-bold text-blue-950">
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
        mt-10
        pt-8
        border-t border-blue-100
        text-sm
        text-slate-500
        space-y-3
      "
    >
      <p>{secure1}</p>
      <p>{secure2}</p>
      <p>{secure3}</p>
    </div>
  );
}
