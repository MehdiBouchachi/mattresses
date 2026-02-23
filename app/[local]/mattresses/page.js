"use client";

import useProducts from "@/components/features/products/useProducts";
import Filters from "@/components/features/products/Filters";
import ProductGrid from "@/components/features/products/ProductGrid";
import Pagination from "@/components/features/products/Pagination";
import { useRouter, useParams } from "next/navigation";

export default function MattressesPage() {
  const { state, dispatch, paginatedProducts, totalPages } = useProducts();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <div className="min-h-screen bg-beige-100">
      {/* ================= PAGE HEADER ================= */}
      <section className="max-w-7xl mx-auto px-8 pt-40 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-soft mb-6">
          <button
            onClick={() => router.push(`/${locale}`)}
            className="hover:text-primary-600 transition"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-primary-600 font-medium">Mattresses</span>
        </div>

        <h1 className="text-5xl font-semibold tracking-tight mb-6">
          All Mattresses
        </h1>

        <p className="text-text-muted max-w-xl text-lg">
          Explore our full product universe engineered for premium comfort.
        </p>
      </section>

      {/* ================= FILTERS ================= */}
      <Filters state={state} dispatch={dispatch} />

      {/* ================= PRODUCTS ================= */}
      <section className="py-10 border-t border-beige-500">
        <div className="max-w-7xl mx-auto px-8">
          {/* Product Count */}
          <div className="mb-10 text-sm text-text-soft">
            Showing {paginatedProducts.length} products
          </div>

          <ProductGrid products={paginatedProducts} />

          <div className="mt-16">
            <Pagination
              totalPages={totalPages}
              page={state.page}
              dispatch={dispatch}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
