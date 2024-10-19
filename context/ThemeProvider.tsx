// ThemeContext.tsx
import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { light, dark } from "@/constants/theme"; // Adjust import path

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeColor = useSelector((state: any) => state.theme.color); // Access the theme color from the Redux store

  const colors = themeColor === "dark" ? dark : light;

  return (
    <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
  );
};

export const useThemeColors = () => {
  return useContext(ThemeContext);
};
