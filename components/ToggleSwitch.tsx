// components/ToggleSwitch.tsx
import { COLORS, FONTS } from "@/constants/theme";
import { UserTypes } from "@/types/user";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ToggleSwitchProps = {
  onToggle: (value: UserTypes) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle }) => {
  const [active, setActive] = useState<UserTypes>("User");

  const handleToggle = (value: UserTypes) => {
    setActive(value);
    onToggle(value);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, active === "User" && styles.activeButton]}
          onPress={() => handleToggle("User")}
        >
          <Text
            style={[styles.buttonText, active === "User" && styles.activeText]}
          >
            User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, active === "Company" && styles.activeButton]}
          onPress={() => handleToggle("Company")}
        >
          <Text
            style={[
              styles.buttonText,
              active === "Company" && styles.activeText,
            ]}
          >
            Company
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.indicator,
            active === "User" ? styles.userIndicator : styles.companyIndicator,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
    width: "60%", // Adjust as necessary
    height: 40, // Adjust as necessary
    backgroundColor: "#e0e0e0",
    position: "relative",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    zIndex: 1,
  },
  buttonText: {
    fontSize: FONTS.small,
    color: "#666",
  },
  activeButton: {
    // backgroundColor: "#ffffff",
  },
  activeText: {
    color: "#fff",
  },
  indicator: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: COLORS.secondary, // Change color as necessary
    borderRadius: 20,
    top: 0,
    left: 0,
  },
  userIndicator: {
    left: 0,
  },
  companyIndicator: {
    left: "50%",
  },
});

export default ToggleSwitch;
