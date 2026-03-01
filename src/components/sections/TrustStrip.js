export default function TrustStrip({ translation }) {
  const {
    years: { value: valueYears, label: labelYears },
    materials: { value: valueMaterials, label: labelMaterials },
    tech: { value: valueTech, label: labelTech },
    delivery: { value: valueDelivery, label: labelDelivery },
  } = translation.home.trust;

  const items = [
    { value: valueYears, label: labelYears },
    { value: valueMaterials, label: labelMaterials },
    { value: valueTech, label: labelTech },
    { value: valueDelivery, label: labelDelivery },
  ];

  return (
    <section className="bg-white border-y border-blue-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 text-center gap-y-8 lg:gap-y-0 lg:divide-x lg:divide-blue-100">
          {items.map((item, index) => (
            <div key={index} className="px-4 sm:px-6 space-y-2 sm:space-y-3">
              {/* Value */}
              <div className="text-2xl sm:text-3xl font-bold text-blue-800">
                {item.value}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm tracking-wide text-slate-600 leading-snug">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
