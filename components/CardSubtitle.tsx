import { OpaqueColorValue, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, FONTS } from "../constants/theme";

interface CardSubtitleProps {
  text: string;
  icon: any;
  iconColor: string | OpaqueColorValue | undefined;
}
const CardSubtitle = ({ icon, text, iconColor }: CardSubtitleProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={14} color={iconColor} />
      <Text style={[styles.text, { color: COLORS.textSecondary }]}>{text}</Text>
    </View>
  );
};

export default CardSubtitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
  text: {
    fontSize: FONTS.small,
    marginLeft: 5,
  },
});
