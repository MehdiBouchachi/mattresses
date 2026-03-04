import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    /* ================= ADD ================= */

    addToCart: (state, action) => {
      const { id, size, thickness } = action.payload;

      const existing = state.items.find(
        (item) =>
          item.id === id && item.size === size && item.thickness === thickness,
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

    /* ================= REMOVE ================= */

    removeFromCart: (state, action) => {
      const { id, size, thickness } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size &&
            item.thickness === thickness
          ),
      );
    },

    /* ================= UPDATE ================= */

    updateQuantity: (state, action) => {
      const { id, size, thickness, quantity } = action.payload;

      const item = state.items.find(
        (item) =>
          item.id === id && item.size === size && item.thickness === thickness,
      );

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    /* ================= DECREASE ================= */

    decreaseQuantity: (state, action) => {
      const { id, size, thickness } = action.payload;

      const item = state.items.find(
        (item) =>
          item.id === id && item.size === size && item.thickness === thickness,
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (i) =>
              !(i.id === id && i.size === size && i.thickness === thickness),
          );
        }
      }
    },

    /* ================= CLEAR ================= */

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
