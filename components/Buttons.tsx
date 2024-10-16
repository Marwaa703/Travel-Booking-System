import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  DimensionValue,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, BORDER_RADIUS } from "../constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  fontSize?: number;
  type?: "primary" | "secondary";
  width?: DimensionValue | undefined;
  align?: "flex-start" | "center" | "flex-end";
  disabled?: boolean;
  loading?: boolean;
  loadingMessage?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "primary",
  width = "100%",
  align,
  fontSize = FONTS.medium,
  loadingMessage,
  loading,
  disabled,
}) => {
  const buttonStyle = {
    width,
    backgroundColor: disabled
      ? "grey"
      : type === "secondary"
        ? styles.secondaryButton.backgroundColor
        : styles.primaryButton.backgroundColor,
  };

  const buttonStyles = [
    styles.button,
    type === "secondary" ? styles.secondaryButton : styles.primaryButton,
    buttonStyle,
  ];
  return (
    <View style={[styles.container, { alignItems: align }]}>
      <TouchableOpacity
        onPress={!disabled ? onPress : () => {}}
        style={buttonStyles}
      >
        {loading ? (
          <>
            <ActivityIndicator color={COLORS.bg} />
            <Text style={[styles.loadingText, { fontSize }]}>
              {loadingMessage}
            </Text>
          </>
        ) : (
          <Text
            style={[
              type === "secondary" ? styles.secondaryText : styles.primaryText,
              { fontSize },
            ]}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.large,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  primaryText: {
    fontSize: FONTS.medium,
    color: COLORS.bg,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    width: 15,
  },
  secondaryText: {
    fontSize: FONTS.small,
    color: COLORS.bg,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingText: {
    marginLeft: 10, // Space between spinner and text
    color: COLORS.bg,
    textAlign: "center",
    fontSize: FONTS.medium,
  },
});

export default Button;
