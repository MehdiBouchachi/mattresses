"use client";

import { useReducer, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products, itemsPerPage } from "@/constants/products";

const initialState = {
  category: "all",
  subcategory: "all",
  minPrice: 0,
  maxPrice: 200000,
  dimension: "all",
  page: 1,
};

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
      return {
        ...state,
        subcategory: action.payload,
        page: 1,
      };

    case "SET_PRICE":
      return {
        ...state,
        ...action.payload,
        page: 1,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "RESET_PRICE":
      return {
        ...state,
        minPrice: 0,
        maxPrice: 200000,
        page: 1,
      };

    case "SET_DIMENSION":
      return {
        ...state,
        dimension: action.payload,
        page: 1,
      };

    default:
      return state;
  }
}

export default function useProducts() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();

  const isFirstLoad = useRef(true);

  /* ================= INIT FROM URL ================= */
  useEffect(() => {
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const page = searchParams.get("page");
    const dimension = searchParams.get("dimension");
    dispatch({
      type: "INIT_FROM_URL",
      payload: {
        category: category || "all",
        subcategory: subcategory || "all",
        minPrice: min ? Number(min) : 0,
        maxPrice: max ? Number(max) : 200000,
        dimension: dimension || "all",
        page: page ? Number(page) : 1,
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

    if (state.page !== 1) params.set("page", state.page);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [state, router]);

  /* ================= FILTERING ================= */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        state.category === "all" ||
        p.category?.toLowerCase() === state.category.toLowerCase();

      const subMatch =
        state.subcategory === "all" ||
        p.subcategory?.toLowerCase() === state.subcategory.toLowerCase();

      const productPrice =
        p.basePrice ?? p.price ?? p.details?.dimensions?.[0]?.price ?? 0;

      const priceMatch =
        productPrice >= state.minPrice && productPrice <= state.maxPrice;

      const dimensionMatch =
        state.dimension === "all" ||
        p.details?.dimensions?.some((d) => d.size === state.dimension);

      return categoryMatch && subMatch && priceMatch && dimensionMatch;
    });
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
