export default function EmptyCart({ data, actions, i18n = {} }) {
  const { locale } = data;
  const { back } = actions;

  const { title, description, continue: continueText } = i18n;

  const isRTL = locale === "ar";
  const arrow = isRTL ? "←" : "→";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-6 py-20 text-center overflow-hidden">
      <div
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[90vw] max-w-[700px]
          h-[90vw] max-h-[700px]
          bg-blue-100
          blur-[120px] sm:blur-[160px] lg:blur-[200px]
          opacity-40
          pointer-events-none
        "
      />

      <div className="relative max-w-lg">
        <h1 className="text-2xl  sm:text-3xl lg:text-4xl font-semibold mb-6 text-blue-950">
          {title}
        </h1>

        <p className="text-base text-slate-600 mb-10 leading-relaxed">
          {description}
        </p>

        <button
          onClick={back}
          className="inline-flex  items-center gap-2 text-blue-950 font-semibold text-sm hover:text-blue-600 transition"
        >
          {isRTL ? (
            <>
              {arrow} {continueText}
            </>
          ) : (
            <>
              {continueText} {arrow}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
