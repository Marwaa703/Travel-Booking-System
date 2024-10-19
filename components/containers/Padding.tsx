import { StyleSheet, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { ColorPalette, COLORS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const Padding = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  return <View style={styles(theme).container}>{children}</View>;
};

export default Padding;

const styles = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      flex: 1,
      height: "100%",
      backgroundColor: COLORS.bg,
    },
  });
