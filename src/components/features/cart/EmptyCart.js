export default function EmptyCart({ data, actions, i18n = {} }) {
  const { locale } = data;
  const { back } = actions;

  const { title, description, continue: continueText } = i18n;

  const isRTL = locale === "ar";

  return (
    <div
      className="relative min-h-[80vh] flex items-center justify-center bg-white px-6 py-16 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Subtle Background Glow */}
      <div
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[80vw] max-w-[600px]
          h-[80vw] max-h-[600px]
          bg-blue-100
          blur-[120px]
          opacity-30
          pointer-events-none
        "
      />

      <div className="relative max-w-md text-center">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-blue-950">
          {title}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
          {description}
        </p>

        {/* CTA */}
        <button
          onClick={back}
          className="
            inline-flex
            items-center
            gap-2
            bg-blue-900
            text-white
            px-6
            py-2.5
            rounded-full
            text-sm
            font-medium
            hover:bg-blue-950
            transition
          "
        >
          {isRTL ? <>{continueText} ←</> : <>{continueText} →</>}
        </button>
      </div>
    </div>
  );
}
