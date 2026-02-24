"use client";

import Button from "../ui/Button";

export default function FinalCTA({ translation }) {
  const { title, desc, button } = translation.home.cta;

  return (
    <section className="bg-beige-150 py-28">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h3 className="text-4xl font-semibold mb-6">{title}</h3>

        <p className="text-text-body max-w-2xl mx-auto leading-relaxed mb-10">
          {desc}
        </p>

        <Button variant="gold" size="lg">
          {button}
        </Button>
      </div>
    </section>
  );
}
