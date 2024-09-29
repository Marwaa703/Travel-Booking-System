import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { Href, Link } from "expo-router";
import { COLORS } from "@/constants/theme";
interface LinkButtonProps {
  to: Href<string | object>;
  label: string;
  style?: StyleProp<TextStyle>;
}
const LinkButton = ({ to, label, style }: LinkButtonProps) => {
  return (
    <Link style={[styles.button, style]} href={to}>
      {label}
    </Link>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  button: {
    color: COLORS.accent,
  },
});
