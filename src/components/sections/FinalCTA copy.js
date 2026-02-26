"use client";

import Button from "../ui/Button";

export default function FinalCTA({ translation }) {
  const { title, desc, button } = translation.home.cta;

  return (
    <section className="relative py-36 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-beige-50 to-white" />

      <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
        <h3 className="text-4xl font-semibold mb-6 tracking-tight text-text-heading">
          {title}
        </h3>

        <p className="text-text-body max-w-2xl mx-auto leading-relaxed mb-12 text-lg">
          {desc}
        </p>

        <Button
          size="lg"
          className="bg-primary-600 text-white 
      hover:bg-primary-700 
      px-12 py-5 text-lg 
      shadow-[0_20px_50px_rgba(0,90,182,0.25)]"
        >
          {button}
        </Button>
      </div>
    </section>
  );
}
