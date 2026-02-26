export default function BackTitle({ locale, onBack, title, backLabel }) {
  const arrow = locale === "ar" ? "←" : "→";

  return (
    <div className="mb-14">
      <button
        onClick={onBack}
        className="text-sm text-primary-600 hover:underline mb-4"
      >
        {`${backLabel} ${arrow}`}
      </button>

      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
    </div>
  );
}
