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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-7 sm:py-9">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-7 lg:gap-y-0 lg:divide-x  lg:divide-blue-100">
          {items.map((item, index) => (
            <div
              key={index}
              className="
                flex flex-col items-center justify-center
                text-center
                px-4 sm:px-6 
              "
            >
              {/* VALUE */}
              <div
                className="
                text-2xl
                sm:text-3xl
                font-semibold
                text-blue-900
                tracking-tight
                "
              >
                {item.value}
              </div>

              {/* ACCENT LINE */}

              {/* LABEL */}
              <div
                className="
                text-[11px]
                sm:text-xs
                text-slate-500
                leading-snug
                max-w-30
              "
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
