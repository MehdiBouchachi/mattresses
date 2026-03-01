"use client";

import useProducts from "@/components/features/products/useProducts";
import Filters from "@/components/features/products/Filters";
import ProductGrid from "@/components/features/products/ProductGrid";
import Pagination from "@/components/features/products/Pagination";
import Breadcrumb from "@/components/ui/Breadcrumb";

/* ======================================================
   MAIN PAGE
====================================================== */

export default function MattressesClient({ locale, translation }) {
  const { state, dispatch, paginatedProducts, totalPages } = useProducts();

  const {
    mattressesPage: {
      breadcrumbHome,
      breadcrumbCurrent,
      title,
      description,
      showing,
      products: productsLabel,
      filters: filtersTranslation,
    },
    home: {
      products: { productCard: productCardTranslation },
    },
  } = translation;

  return (
    <div className="min-h-screen bg-beige-100">
      <PageHeader
        locale={locale}
        title={title}
        description={description}
        breadcrumbItems={[
          { label: breadcrumbHome, href: `/${locale}` },
          { label: breadcrumbCurrent },
        ]}
      />

      {/* ================= FILTERS ================= */}
      <Filters
        locale={locale}
        state={state}
        dispatch={dispatch}
        filtersTranslation={filtersTranslation}
      />

      {/* ================= PRODUCTS ================= */}
      <section className="py-8 sm:py-10 border-t border-beige-500">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-6 sm:mb-8 text-xs sm:text-sm text-text-soft">
            {showing} {paginatedProducts.length} {productsLabel}
          </div>

          <ProductGrid
            products={paginatedProducts}
            productCardTranslation={productCardTranslation}
            locale={locale}
          />

          <div className="mt-10 sm:mt-14 lg:mt-16">
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

/* ======================================================
   PAGE HEADER (Reusable Pattern)
====================================================== */

function PageHeader({ locale, title, description, breadcrumbItems }) {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-24 sm:pt-28 lg:pt-36 pb-10 sm:pb-14 lg:pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-tight mb-4 sm:mb-6">
        {title}
      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-text-muted max-w-xl">
        {description}
      </p>
    </section>
  );
}

/* ======================================================
   REUSABLE BREADCRUMB
====================================================== */
