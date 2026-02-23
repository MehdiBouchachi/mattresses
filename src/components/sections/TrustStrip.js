export default function TrustStrip() {
  return (
    <section className="bg-[var(--color-beige-50)] border-y border-[var(--color-beige-600)]">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center divide-x divide-[var(--color-beige-600)]">
          <div className="px-6 space-y-3">
            <div className="text-3xl font-semibold text-[var(--color-primary-600)]">
              60+
            </div>
            <div className="text-sm tracking-wide text-[var(--color-text-body)]">
              Years Craftsmanship
            </div>
          </div>

          <div className="px-6 space-y-3">
            <div className="text-3xl font-semibold text-[var(--color-primary-600)]">
              Premium
            </div>
            <div className="text-sm tracking-wide text-[var(--color-text-body)]">
              Materials
            </div>
          </div>

          <div className="px-6 space-y-3">
            <div className="text-3xl font-semibold text-[var(--color-primary-600)]">
              Advanced
            </div>
            <div className="text-sm tracking-wide text-[var(--color-text-body)]">
              Breathable Technology
            </div>
          </div>

          <div className="px-6 space-y-3">
            <div className="text-3xl font-semibold text-[var(--color-primary-600)]">
              Nationwide
            </div>
            <div className="text-sm tracking-wide text-[var(--color-text-body)]">
              Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
