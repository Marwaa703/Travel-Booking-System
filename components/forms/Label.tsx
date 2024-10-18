import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants/theme";
interface LabelProps {
  text: string;
  style?: StyleProp<TextStyle>;
}
const Label = ({ text, style }: LabelProps) => {
  return <Text style={[styles.label, style]}>{text}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  label: {
    fontSize: FONTS.normal,
    color: COLORS.textPrimary,
  },
});
