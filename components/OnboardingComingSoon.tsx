import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Spacer from "./Spacer";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "expo-router";
import { isCompanyUserRole } from "@/utils";

const OnboardingComingSoon = () => {
  // check if users is loged in

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
