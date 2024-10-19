/* eslint-disable react-native/no-unused-styles */
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AlertProps {
  message: string;
  type: "success" | "error" | "info";
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return (
    <View
      style={[
        styles.container,
        type === "success" && styles.success,
        type === "error" && styles.error,
        type === "info" && styles.info,
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      borderRadius: 4,
      padding: 10,
      marginBottom: 10,
    },
    success: {
      backgroundColor: "#d4edda",
      borderColor: "#c3e6cb",
      color: "#155724",
    },
    error: {
      backgroundColor: "#f8d7da",
      borderColor: "#f5c6cb",
      color: "#721c24",
    },
    info: {
      backgroundColor: "#d1ecf1",
      borderColor: "#bee5eb",
      color: "#0c5460",
    },
    message: {
      fontSize: 16,
      textAlign: "center",
    },
  });

export default Alert;
