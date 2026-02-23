"use client";

import Button from "../ui/Button";

export default function FinalCTA() {
  return (
    <section className="bg-[var(--color-beige-150)] py-28">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h3 className="text-4xl font-semibold mb-6">Invest in Better Sleep</h3>

        <p className="text-[var(--color-text-body)] max-w-2xl mx-auto leading-relaxed mb-10">
          Experience the precision, comfort, and durability that define LITMAD.
          Your body deserves restorative sleep — every night.
        </p>

        <Button variant="gold" size="lg">
          Start Your Journey
        </Button>
      </div>
    </section>
  );
}
