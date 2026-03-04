function TechnicalSpecsSection({ technicalSpecs, featuresTranslation }) {
  if (!technicalSpecs.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-t border-blue-100">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-blue-950">
        {featuresTranslation}
      </h2>

      <div className="grid gap-4 sm:gap-6">
        {technicalSpecs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between items-center border-b border-blue-100 pb-3 sm:pb-4"
          >
            <span className="text-sm sm:text-base font-medium text-blue-950">
              {spec.label}
            </span>

            <span className="text-sm sm:text-base text-slate-600 text-right max-w-[60%]">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechnicalSpecsSection;
