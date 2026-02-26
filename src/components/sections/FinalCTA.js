"use client";

import Button from "../ui/Button";

export default function FinalCTA({ translation }) {
  const { title, desc, button } = translation.home.cta;

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-beige-50 to-white" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 tracking-tight text-text-heading">
          {title}
        </h3>

        <p className="text-sm sm:text-base lg:text-lg text-text-body max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 lg:mb-12">
          {desc}
        </p>

        <div className="w-full sm:w-auto">
          <Button
            size="lg"
            fullWidth
            className="sm:w-auto bg-primary-600 text-white 
            hover:bg-primary-700 
            px-8 sm:px-10 lg:px-12 
            py-3 sm:py-4 lg:py-5
            text-sm sm:text-base lg:text-lg
            shadow-[0_20px_50px_rgba(0,90,182,0.25)]"
          >
            {button}
          </Button>
        </div>
      </div>
    </section>
  );
}
