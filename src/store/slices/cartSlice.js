import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const { id, size } = action.payload;

      const existing = state.items.find(
        (item) => item.id === id && item.size === size,
      );

      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;

      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size),
      );
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.id === id && item.size === size,
      );

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    decreaseQuantity: (state, action) => {
      const { id, size } = action.payload;

      const item = state.items.find(
        (item) => item.id === id && item.size === size,
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) => !(i.id === id && i.size === size),
          );
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

/* ================= SELECTORS ================= */

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
