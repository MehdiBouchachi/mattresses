"use client";

import useProducts from "@/components/features/products/useProducts";
import Filters from "@/components/features/products/Filters";
import ProductGrid from "@/components/features/products/ProductGrid";
import Pagination from "@/components/features/products/Pagination";

export default function MattressesPage() {
  const { state, dispatch, paginatedProducts, totalPages } = useProducts();

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <section className="pt-44 pb-20 bg-[#EFEAE2]">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-semibold mb-4">All Mattresses</h1>
          <p className="text-[#6A6A6A] max-w-xl">
            Explore our full product universe engineered for premium comfort.
          </p>
        </div>
      </section>

      <Filters state={state} dispatch={dispatch} />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <ProductGrid products={paginatedProducts} />

          <Pagination
            totalPages={totalPages}
            page={state.page}
            dispatch={dispatch}
          />
        </div>
      </section>
    </div>
  );
}
