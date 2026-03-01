"use client";

import { useReducer, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products, itemsPerPage } from "@/constants/products";

/* ================= INITIAL STATE ================= */

const initialState = {
  category: "all",
  subcategory: "all",
  minPrice: 0,
  maxPrice: 200000,
  size: "",
  thickness: null, // number | null
  page: 1,
};

/* ================= REDUCER ================= */

function reducer(state, action) {
  switch (action.type) {
    case "INIT_FROM_URL":
      return { ...state, ...action.payload };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
        subcategory: "all",
        page: 1,
      };

    case "SET_SUBCATEGORY":
      return { ...state, subcategory: action.payload, page: 1 };

    case "SET_PRICE":
      return { ...state, ...action.payload, page: 1 };

    case "SET_SIZE":
      return { ...state, size: action.payload, thickness: null, page: 1 };

    case "SET_THICKNESS":
      return { ...state, thickness: action.payload, page: 1 };

    case "SET_PAGE":
      return { ...state, page: action.payload };

    case "RESET_PRICE":
      return { ...state, minPrice: 0, maxPrice: 200000, page: 1 };

    default:
      return state;
  }
}

/* ================= HOOK ================= */

export default function useProducts() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  /* ================= INIT FROM URL ================= */

  useEffect(() => {
    dispatch({
      type: "INIT_FROM_URL",
      payload: {
        category: searchParams.get("category") || "all",
        subcategory: searchParams.get("subcategory") || "all",
        minPrice: searchParams.get("min") ? Number(searchParams.get("min")) : 0,
        maxPrice: searchParams.get("max")
          ? Number(searchParams.get("max"))
          : 200000,
        size: searchParams.get("size") || "",
        thickness: searchParams.get("thickness")
          ? Number(searchParams.get("thickness"))
          : null,
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      },
    });

    isFirstLoad.current = false;
  }, []);

  /* ================= SYNC TO URL ================= */

  useEffect(() => {
    if (isFirstLoad.current) return;

    const params = new URLSearchParams();

    if (state.category !== "all") params.set("category", state.category);
    if (state.subcategory !== "all")
      params.set("subcategory", state.subcategory);
    if (state.minPrice !== 0) params.set("min", state.minPrice);
    if (state.maxPrice !== 200000) params.set("max", state.maxPrice);
    if (state.size) params.set("size", state.size);
    if (state.thickness !== null) params.set("thickness", state.thickness);
    if (state.page !== 1) params.set("page", state.page);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [state]);

  /* ================= FILTERING + VARIANT LOGIC ================= */

  const filteredProducts = useMemo(() => {
    return products
      .map((p) => {
        /* ---------- CATEGORY FILTER ---------- */

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

          if (!option) return null; // invalid combination

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

        if (effectiveMin < state.minPrice || effectiveMax > state.maxPrice)
          return null;

        return {
          ...p,
          dynamicPrice,
          priceRange,
        };
      })
      .filter(Boolean);
  }, [state]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (state.page - 1) * itemsPerPage,
    state.page * itemsPerPage,
  );

  return {
    state,
    dispatch,
    paginatedProducts,
    totalPages,
  };
}
