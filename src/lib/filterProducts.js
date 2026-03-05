export function filterProducts(products, state) {
  return products
    .map((p) => {
      /* ================= CATEGORY ================= */

      const categoryMatch =
        state.category === "all" ||
        p.category?.toLowerCase() === state.category.toLowerCase();

      const subMatch =
        state.subcategory === "all" ||
        p.subcategory?.toLowerCase() === state.subcategory.toLowerCase();

      if (!categoryMatch || !subMatch) return null;

      let dynamicPrice = null;
      let priceRange = null;

      /* ================= SIZE + THICKNESS ================= */

      if (state.size && state.thickness !== null) {
        const dimension = p.details?.dimensions?.find(
          (d) => d.size === state.size,
        );

        const option = dimension?.options?.find(
          (o) => o.thickness === state.thickness,
        );

        if (!option) return null;

        dynamicPrice = option.price;
      } else if (state.size) {
        /* ================= ONLY SIZE ================= */
        const dimension = p.details?.dimensions?.find(
          (d) => d.size === state.size,
        );

        if (!dimension) return null;

        const prices = dimension.options?.map((o) => o.price) || [];

        if (!prices.length) return null;

        priceRange = {
          min: Math.min(...prices),
          max: Math.max(...prices),
        };
      } else {
        /* ================= NO SELECTION ================= */
        const allPrices =
          p.details?.dimensions?.flatMap((d) =>
            d.options?.map((o) => o.price),
          ) || [];

        if (!allPrices.length) return null;

        priceRange = {
          min: Math.min(...allPrices),
          max: Math.max(...allPrices),
        };
      }

      /* ================= PRICE FILTER ================= */

      const effectiveMin = dynamicPrice ?? priceRange?.min;
      const effectiveMax = dynamicPrice ?? priceRange?.max;

      if (effectiveMax < state.minPrice || effectiveMin > state.maxPrice)
        return null;

      return {
        ...p,
        dynamicPrice,
        priceRange,
      };
    })
    .filter(Boolean);
}
