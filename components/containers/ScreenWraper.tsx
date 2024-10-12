import { ScrollView, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import { bottomTabsHeight } from "@/constants/dimentions";

// this component is used to wrap content in screens with bottom nav tabs only
const ScreenWraper = ({ children }: PropsWithChildren) => {
  return <ScrollView style={styles.wraper}>{children}</ScrollView>;
};

export default ScreenWraper;

const styles = StyleSheet.create({
  wraper: {
    marginBottom: bottomTabsHeight,
    backgroundColor: "white",
  },
});
