export default function BackTitle({ locale, onBack, title, backLabel }) {
  const isRTL = locale === "ar";
  const arrow = isRTL ? "←" : "→";

  return (
    <div className="mb-8 sm:mb-10 lg:mb-14">
      <button
        onClick={onBack}
        className="
          text-xs sm:text-sm 
          text-primary-600 
          hover:underline 
          mb-3 sm:mb-4
          transition-colors
        "
      >
        {isRTL ? `${arrow} ${backLabel}` : `${backLabel} ${arrow}`}
      </button>

      <h1
        className="
          text-2xl sm:text-3xl lg:text-4xl
          font-semibold 
          tracking-tight
          leading-tight
        "
      >
        {title}
      </h1>
    </div>
  );
}
