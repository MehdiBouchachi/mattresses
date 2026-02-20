import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  language: "en",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { toggleTheme, setLanguage } = uiSlice.actions;

export default uiSlice.reducer;
