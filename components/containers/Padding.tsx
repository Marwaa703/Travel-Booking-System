/* eslint-disable react-native/no-unused-styles */

import { StyleSheet, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { ColorPalette, COLORS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const Padding = ({ children }: PropsWithChildren) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);

  return <View style={styles.container}>{children}</View>;
};

export default Padding;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      flex: 1,
      height: "100%",
      backgroundColor: COLORS.bg,
    },
  });
