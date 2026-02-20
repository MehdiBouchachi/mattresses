import Button from "../ui/Button";

export default function FinalCTA() {
  return (
    <section className="py-40 text-center bg-[#F3EEE6]">
      <h3 className="text-5xl font-semibold">Invest in Better Sleep</h3>

      <p className="mt-6 text-[#6A6A6A] max-w-xl mx-auto">
        Discover a new standard of rest with Litmad’s precision-crafted mattress
        collection.
      </p>

      <Button variant="gold" size="lg" className="mt-12">
        Start Your Journey
      </Button>
    </section>
  );
}
