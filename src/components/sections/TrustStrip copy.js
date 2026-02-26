export default function TrustStrip({ translation }) {
  const {
    years: { value: valueYears, label: labelYears },
    materials: { value: valueMaterials, label: labelMaterials },
    tech: { value: valueTech, label: labelTech },
    delivery: { value: valueDelivery, label: labelDelivery },
  } = translation.home.trust;
  return (
    <section className="bg-beige-50 border-y border-beige-600">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center divide-x divide-beige-600">
          <div className="px-6 space-y-3">
            <div className="text-3xl font-semibold text-primary-600">
              {valueYears}
            </div>
            <div className="text-sm tracking-wide text-text-body">
              {labelYears}
            </div>
          </div>

          <div className="px-6 space-y-3">
            <div className="text-3xl font-semibold text-primary-600">
              {valueMaterials}
            </div>
            <div className="text-sm tracking-wide text-text-body">
              {labelMaterials}
            </div>
          </div>

          <div className="px-6 space-y-3">
            <div className="text-3xl font-semibold text-primary-600">
              {valueTech}
            </div>
            <div className="text-sm tracking-wide text-text-body">
              {labelTech}
            </div>
          </div>

          <div className="px-6 space-y-3">
            <div className="text-3xl font-semibold text-primary-600">
              {valueDelivery}
            </div>
            <div className="text-sm tracking-wide text-text-body">
              {labelDelivery}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
