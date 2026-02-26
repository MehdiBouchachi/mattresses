export default function EmptyCart({ data, actions, i18n = {} }) {
  const { locale } = data;
  const { back } = actions;

  const { title, description, continue: continueText } = i18n;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-beige-100">
      <h1 className="text-3xl font-semibold mb-4">{title}</h1>
      <p className="text-text-muted mb-8">{description}</p>

      <button
        onClick={back}
        className="text-primary-600 font-medium hover:underline"
      >
        {locale === "ar" ? `${continueText} ←` : `${continueText} →`}
      </button>
    </div>
  );
}
