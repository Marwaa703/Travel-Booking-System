/* eslint-disable react-native/no-unused-styles */
import { OpaqueColorValue, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorPalette, FONTS } from "../constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface CardSubtitleProps {
  text: string;
  icon: any;
  iconColor: string | OpaqueColorValue | undefined;
}
const CardSubtitle = ({ icon, text, iconColor }: CardSubtitleProps) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={14} color={iconColor} />
      <Text style={[styles.text, { color: theme.textSecondary }]}>{text}</Text>
    </View>
  );
};

export default CardSubtitle;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      marginTop: 10,
    },
    text: {
      fontSize: FONTS.small,
      marginLeft: 5,
    },
  });
