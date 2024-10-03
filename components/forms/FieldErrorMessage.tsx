import { StyleSheet, Text } from "react-native";
import React from "react";
import { FONTS } from "@/constants/theme";

const FieldErrorMessage = ({ error }: { error: string }) => {
  if (!error) return;
  return <Text style={styles.error}>{error}</Text>;
};

export default FieldErrorMessage;
const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: FONTS.small,
    marginTop: 4,
  },
});
