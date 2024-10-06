/* eslint-disable prettier/prettier */

export const COLORS = {
  // primary: "#ea7932", // New Primary color for app elements
  primary: "#E88D67", // Primary color for app elements
  secondary: "#006989", // Secondary color for headers, buttons, etc.
  accent: "#005C78", // Accent color for highlights
  light: "#F7F7F9", // light color 
  background: "#F3F7EC", // Background color for screens
  textPrimary: "#333333", // Primary text color
  textSubtitle: "#7D848D", // Primary text color
  textSecondary: "#777777", // Secondary text color
  error: "#ff4d4d", // Error color
  success: "#4caf50", // Success color
  warning: "#ff9800", // Warning color
  priceTag: "#FBA834", // Color for price tags
  calendarSelected: "#CAF4FF", // Calendar selected date color
  opacity:"rgba(255, 255, 255, 0.7)",
  link:'#0D6EFD'

};
export const DARK_COLORS = {
  primary: "#E88D67", // Keeping the primary color consistent
  secondary: "#00A1C1", // Lighter secondary color to stand out on dark background
  accent: "#008FB3", // Accent color for highlights
  light: "#3A3A3C", // Darker "light" color for contrast
  background: "#1C1C1E", // Dark background color for screens
  textPrimary: "#EAEAEA", // Light color for primary text
  textSubtitle: "#A0A3A8", // Slightly dimmed text for subtitles
  textSecondary: "#B0B0B0", // Lighter secondary text color
  error: "#FF6B6B", // Bright error color for dark backgrounds
  success: "#4CAF50", // Same success color to retain consistency
  warning: "#FF9800", // Same warning color
  priceTag: "#FBA834", // Same price tag color
  calendarSelected: "#1E90FF", // Bright selected date color to pop on dark background
  opacity: "rgba(255, 255, 255, 0.3)", // Adjusted opacity for overlays
  link: '#3A8DFF' // Lighter link color for better contrast
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
