import { useReducer, useMemo, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "SET_IMAGE":
      return { ...state, selectedImage: action.payload };

    case "SET_DIMENSION":
      return { ...state, selectedDimension: action.payload };

    case "SET_DENSITY":
      return { ...state, selectedDensity: action.payload };

    case "SET_THICKNESS":
      return { ...state, selectedThickness: action.payload };

    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };

    case "TOGGLE_FAQ":
      return {
        ...state,
        openFAQ: state.openFAQ === action.payload ? null : action.payload,
      };

    case "SET_ZOOM":
      return { ...state, zoomStyle: action.payload };

    default:
      return state;
  }
}

export function useProductController(product) {
  const initialState = {
    selectedImage: product.images?.[0] ?? null,
    selectedDimension: product.details?.dimensions?.[0] ?? null,
    selectedDensity: product.details?.densities?.[0]?.value ?? null,
    selectedThickness: null,
    quantity: 1,
    openFAQ: null,
    zoomStyle: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  /* Auto thickness selection */
  useEffect(() => {
    if (!state.selectedDimension?.options) return;

    let filtered = state.selectedDimension.options;

    if (state.selectedDensity) {
      filtered = filtered.filter(
        (opt) => opt.density === state.selectedDensity,
      );
    }

    if (filtered.length > 0) {
      const sorted = [...filtered].sort((a, b) => a.thickness - b.thickness);
      dispatch({ type: "SET_THICKNESS", payload: sorted[0] });
    }
  }, [state.selectedDimension, state.selectedDensity]);

  /* Pricing — memoized */
  const pricing = useMemo(() => {
    const base = state.selectedThickness?.price ?? 0;
    const discount = product.discount ?? 0;
    const hasDiscount = discount > 0;

    const discounted = hasDiscount
      ? Math.round(base * (1 - discount / 100))
      : base;

    return {
      base,
      discount,
      hasDiscount,
      discounted,
      total: discounted * state.quantity,
    };
  }, [state.selectedThickness, state.quantity, product.discount]);

  return { state, dispatch, pricing };
}

