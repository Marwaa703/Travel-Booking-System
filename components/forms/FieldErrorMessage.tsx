/* eslint-disable react-native/no-unused-styles */
import { StyleSheet, Text } from "react-native";
import React from "react";
import { ColorPalette, FONTS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const FieldErrorMessage = ({ error }: { error: string }) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  if (!error) return;
  return <Text style={styles.error}>{error}</Text>;
};

export default FieldErrorMessage;
const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    error: {
      color: "red",
      fontSize: FONTS.small,
      marginTop: 4,
    },
  });
