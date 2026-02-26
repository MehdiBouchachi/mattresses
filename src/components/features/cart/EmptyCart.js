export default function EmptyCart({ data, actions, i18n = {} }) {
  const { locale } = data;
  const { back } = actions;

  const { title, description, continue: continueText } = i18n;

  const arrow = locale === "ar" ? "←" : "→";

  return (
    <div
      className="
        min-h-screen
        flex flex-col
        items-center
        justify-center
        text-center
        px-4 sm:px-6
        py-16 sm:py-20
        bg-beige-100
      "
    >
      <div className="max-w-md sm:max-w-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-5">
          {title}
        </h1>

        <p className="text-sm sm:text-base text-text-muted mb-6 sm:mb-8">
          {description}
        </p>

        <button
          onClick={back}
          className="
            text-primary-600
            font-medium
            text-sm sm:text-base
            hover:underline
            transition
          "
        >
          {`${continueText} ${arrow}`}
        </button>
      </div>
    </div>
  );
}
