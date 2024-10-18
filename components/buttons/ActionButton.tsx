/* eslint-disable react-native/no-unused-styles */
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants/theme";

interface ActionButtonProps {
  text: string;
  onPress: () => void;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
    | undefined;
  variant?: "action" | "primary" | "secondary"; // Button style
  textColor?: string; // New prop for text color
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  text,
  style,
  variant = "primary",
  textColor = "white", // Default text color
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[variant], style]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 1,
    alignItems: "center",
    width: 80,
  },
  action: {
    backgroundColor: "transparent",
  },
  primary: {
    backgroundColor: "dodgerblue",
    borderRadius: 1,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  secondary: {
    backgroundColor: "#6C757D",
  },
  text: {
    letterSpacing: 0.7,
    fontSize: FONTS.small,
  },
});
