/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ColorPalette, COLORS } from "../constants/theme";
import { useTheme } from "@/hooks/useTheme";

type SettingCardProps = {
  title: string;
  onPress: () => void;
  leftIconName: any;
  // leftIconName: any;
};

const SettingCard: React.FC<SettingCardProps> = ({
  title,
  onPress,
  leftIconName,
}) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      {/* Icon on the left */}
      <MaterialIcons
        name={leftIconName}
        size={20}
        color={COLORS.textSecondary}
      />

      {/* Title in the middle */}
      <Text style={styles.titleText}>{title}</Text>

      {/* Right arrow icon */}
      <MaterialIcons
        name="chevron-right"
        size={20}
        color={COLORS.textSecondary}
      />
    </TouchableOpacity>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.bg_surface,
      padding: 15,
      borderRadius: 10,
    },
    titleText: {
      flex: 1, // Takes up available space
      marginLeft: 15,
      fontSize: 16,
      letterSpacing: 0.5,
      color: COLORS.textSecondary, // Text color
    },
  });

export default SettingCard;
