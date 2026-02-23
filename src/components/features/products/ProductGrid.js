import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    console.log("nio data");
  }
  return (
    <div className="grid md:grid-cols-3 gap-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
