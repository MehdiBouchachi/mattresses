"use client";

import Button from "../ui/Button";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-[0.12em]">LITMAD</h1>

        <div className="flex items-center gap-5">
          <Button variant="secondary" size="md">
            Collection
          </Button>

          <Button variant="primary" size="md">
            Shop Now
          </Button>
        </div>
      </div>
    </header>
  );
}
