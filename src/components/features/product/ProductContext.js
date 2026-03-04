"use client";

import { createContext, useContext } from "react";
import { useProductController } from "./useProductController";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";

export const ProductContext = createContext(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used inside ProductProvider");
  }
  return context;
};

export default function ProductProvider({
  product,
  locale,
  translation,
  children,
}) {
  const controller = useProductController(product);
  const dispatchRedux = useDispatch();
  const router = useRouter();

  const handleAddToCart = () => {
    const { state, pricing } = controller;

    dispatchRedux(
      addToCart({
        id: product.id,
        name: product.name,
        image: state.selectedImage,
        price: pricing.discounted,
        size: state.selectedDimension?.size,
        thickness: state.selectedThickness?.thickness,
        density: state.selectedDensity,
        quantity: state.quantity,
      }),
    );
  };

  const value = {
    product,
    locale,
    translation,
    router,
    handleAddToCart,
    ...controller, // state, dispatch, pricing
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
