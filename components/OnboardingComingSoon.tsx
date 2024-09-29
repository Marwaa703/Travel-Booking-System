import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Spacer from "./Spacer";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const OnboardingComingSoon = () => {
  return (
    <View style={styles.bottom}>
      <Text>Coming Soon ...!</Text>
      <Spacer />
      <View style={[styles.center, { width: "60%" }]}>
        <Ionicons name="logo-facebook" color={COLORS.link} size={40} />
        <Ionicons name="logo-instagram" color={COLORS.priceTag} size={40} />
        <Ionicons name="logo-twitter" color={"dodgerblue"} size={40} />
      </View>
    </View>
  );
};

export default OnboardingComingSoon;

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  center: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
