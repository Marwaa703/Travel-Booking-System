/* eslint-disable react-native/no-unused-styles */
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { ColorPalette, FONTS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
interface LabelProps {
  text: string;
  style?: StyleProp<TextStyle>;
}
const Label = ({ text, style }: LabelProps) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return <Text style={[styles.label, style]}>{text}</Text>;
};

export default Label;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    label: {
      fontSize: FONTS.normal,
      color: COLORS.textPrimary,
    },
  });
