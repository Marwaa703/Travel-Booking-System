/* eslint-disable react-native/no-unused-styles */
import { ScrollView, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import { bottomTabsHeight } from "@/constants/dimentions";
import { ColorPalette, COLORS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

// this component is used to wrap content in screens with bottom nav tabs only
const ScreenWraper = ({ children }: PropsWithChildren) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return <ScrollView style={styles.wraper}>{children}</ScrollView>;
};

export default ScreenWraper;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    wraper: {
      marginBottom: bottomTabsHeight,
      backgroundColor: COLORS.bg,
    },
  });
