import { createContext, useContext } from "react";

export const ProductContext = createContext(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used inside ProductProvider");
  }
  return context;
};

export default function ProductProvider({ product, children }) {
  const controller = useProductController(product);

  return (
    <ProductContext.Provider value={controller}>
      {children}
    </ProductContext.Provider>
  );
}
