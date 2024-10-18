// themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  color: "dark" | "light";
}

const initialState: ThemeState = {
  color: "light", // Default to light theme
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.color = state.color;
    },
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.color = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
