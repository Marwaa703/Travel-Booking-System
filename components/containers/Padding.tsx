import { StyleSheet, View } from "react-native";
import React, { PropsWithChildren } from "react";

const Padding = ({ children }: PropsWithChildren) => {
  return <View style={styles.container}>{children}</View>;
};

export default Padding;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
