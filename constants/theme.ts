import { useTheme } from "@/hooks/useTheme";
// types/colors.ts

export type ColorPalette = {
  primary: string; // Primary color for app elements
  secondary: string; // Secondary color for headers, buttons, etc.
  accent: string; // Accent color for highlights
  light: string; // Light color
  bg: string; // Background color for screens
  bg_surface: string; // Surface background color
  textPrimary: string; // Primary text color
  textSubtitle: string; // Subtitle text color
  textSecondary: string; // Secondary text color
  error: string; // Error color
  success: string; // Success color
  warning: string; // Warning color
  priceTag: string; // Color for price tags
  calendarSelected: string; // Calendar selected date color
  opacity: string; // Opacity value
  link: string; // Link color
};

// You can now use this type for your COLORSs object

export const COLORSs: ColorPalette = {
  primary: "#E88D67", // Primary color for app elements
  secondary: "#006989", // Secondary color for headers, buttons, etc.
  accent: "#005C78", // Accent color for highlights
  light: "#ffffff", // light color
  bg: "#FAFAFA", // Background color for screens
  bg_surface: "#fff", // Background color for screens
  textPrimary: "#333333", // Primary text color
  textSubtitle: "#7D848D", // Primary text color
  textSecondary: "#777777", // Secondary text color
  error: "#ff4d4d", // Error color
  success: "#4caf50", // Success color
  warning: "#ff9800", // Warning color
  priceTag: "#FBA834", // Color for price tags
  calendarSelected: "#CAF4FF", // Calendar selected date color
  opacity: "rgba(255, 255, 255, 0.7)",
  link: "#0D6EFD",
};
export const COLORS: ColorPalette = {
  primary: "#FF9756", // Primary color for app elements
  secondary: "#65BFD3", // Secondary color for headers, buttons, etc.
  accent: "#61B5C6", // Accent color for highlights
  light: "#121212", // Light color
  bg: "#1E1E1E", // Background color for screens
  bg_surface: "#2E2E2E", // Background color for screens
  textPrimary: "#F1F1F1", // Primary text color
  textSubtitle: "#C4C4C4", // Subtitle text color
  textSecondary: "#A9A9A9", // Secondary text color
  error: "#FF6B6B", // Error color
  success: "#4CAF50", // Success color
  warning: "#FFC107", // Warning color
  priceTag: "#FFBA54", // Color for price tags
  calendarSelected: "#F1F1F1", // Calendar selected date color
  opacity: "rgba(255, 255, 255, 0.7)",
  link: "#0D6EFD",
};

export const light: ColorPalette = {
  primary: "#E88D67", // Primary color for app elements
  secondary: "#006989", // Secondary color for headers, buttons, etc.
  accent: "#005C78", // Accent color for highlights
  light: "#ffffff", // light color
  bg: "#FAFAFA", // Background color for screens
  bg_surface: "#fff", // Background color for screens
  textPrimary: "#333333", // Primary text color
  textSubtitle: "#7D848D", // Primary text color
  textSecondary: "#777777", // Secondary text color
  error: "#ff4d4d", // Error color
  success: "#4caf50", // Success color
  warning: "#ff9800", // Warning color
  priceTag: "#FBA834", // Color for price tags
  calendarSelected: "#CAF4FF", // Calendar selected date color
  opacity: "rgba(255, 255, 255, 0.7)",
  link: "#0D6EFD",
};
export const dark: ColorPalette = {
  primary: "#FF9756", // Primary color for app elements
  link: "#0D6EFD",
  secondary: "#65BFD3", // Secondary color for headers, buttons, etc.
  accent: "#61B5C6", // Accent color for highlights
  light: "#121212", // Light color
  bg: "#1E1E1E", // Background color for screens
  bg_surface: "#2E2E2E", // Background color for screens
  textPrimary: "#F1F1F1", // Primary text color
  textSubtitle: "#C4C4C4", // Subtitle text color
  textSecondary: "#A9A9A9", // Secondary text color
  error: "#FF6B6B", // Error color
  success: "#4CAF50", // Success color
  warning: "#FFC107", // Warning color
  priceTag: "#FFBA54", // Color for price tags
  calendarSelected: "#F1F1F1", // Calendar selected date color
  opacity: "rgba(0, 0, 0, 0.7)",
};

export const FONTS = {
  xsmall: 10,
  small: 12,
  normal: 14,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 26,
};

export const SPACING = {
  xsmall: 10,
  small: 12,
  normal: 14,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 26,
};

export const BORDER_RADIUS = {
  small: 4,
  medium: 8,
  large: 12,
};

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 8,
  },
};
