import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS, SPACING } from "@/constants/theme";

interface IconButtonProps {
  title: string;
  onPress: () => void;
  direction: "next" | "back";
  buttonStyle?: ViewStyle; // Optional custom style for the button
  textStyle?: TextStyle; // Optional custom style for the text
}

const IconButton: React.FC<IconButtonProps> = ({
  title,
  onPress,
  direction,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {direction === "back" && (
        <Ionicons name="arrow-back" size={SPACING.normal} color="white" />
      )}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {direction === "next" && (
        <Ionicons name="arrow-forward" size={SPACING.normal} color="white" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF", // Customize your color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: FONTS.normal,
    marginHorizontal: 5,
  },
});

export default IconButton;
