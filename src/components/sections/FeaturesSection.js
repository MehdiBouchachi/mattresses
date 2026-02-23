export default function FeaturesSection() {
  return (
    <section className="py-32 bg-beige-200">
      <div className="max-w-7xl mx-auto px-8">
        <h3 className="text-4xl font-semibold text-center mb-20">
          Why Choose Litmad
        </h3>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="p-10 rounded-[28px] bg-primary-50 shadow-sm hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-4">
              Breathable Construction
            </h4>
            <p className="text-text-body leading-relaxed">
              Engineered airflow system regulates temperature throughout the
              night.
            </p>
          </div>

          <div className="p-10 rounded-[28px] bg-primary-50 shadow-sm hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-4">Adaptive Support</h4>
            <p className="text-text-body leading-relaxed">
              Precision-calibrated layers adjust to your body’s natural curves.
            </p>
          </div>

          <div className="p-10 rounded-[28px] bg-primary-50 shadow-sm hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-4">Long-Term Durability</h4>
            <p className="text-text-body leading-relaxed">
              High-density materials maintain resilience for years of comfort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
