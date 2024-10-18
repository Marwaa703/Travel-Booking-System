import { StyleSheet, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { COLORS } from "@/constants/theme";

const Padding = ({ children }: PropsWithChildren) => {
  return <View style={styles.container}>{children}</View>;
};

export default Padding;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    height: "100%",
    backgroundColor: COLORS.bg,
  },
});
