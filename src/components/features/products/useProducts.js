import { useReducer, useMemo } from "react";
import { products, itemsPerPage } from "@/constants/products";

const initialState = {
  category: "all",
  subcategory: "all",
  minPrice: 0,
  maxPrice: 200000,
  page: 1,
};

function reducer(state, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}

export default function useProducts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        state.category === "all" || p.category === state.category;

      const subMatch =
        state.subcategory === "all" || p.subcategory === state.subcategory;

      const priceMatch = p.price >= state.minPrice && p.price <= state.maxPrice;

      return categoryMatch && subMatch && priceMatch;
    });
  }, [state]);

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
