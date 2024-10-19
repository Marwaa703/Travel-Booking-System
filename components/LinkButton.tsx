/* eslint-disable react-native/no-unused-styles */
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import React from "react";
import { Href, Link } from "expo-router";
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
interface LinkButtonProps {
  to: Href<string | object>;
  label: string;
  style?: StyleProp<TextStyle>;
}
const LinkButton = ({ to, label, style }: LinkButtonProps) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return (
    <Link style={[styles.button, style]} href={to}>
      {label}
    </Link>
  );
};

export default LinkButton;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    button: {
      color: COLORS.accent,
    },
  });
