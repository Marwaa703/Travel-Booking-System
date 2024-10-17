// components/ToggleSwitch.tsx
import { COLORS, FONTS } from "@/constants/theme";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ToggleSwitchProps<T extends string> = {
  options: T[];
  onToggle: (value: T) => void;
  selectedOption: T;
};

const ToggleSwitch = <T extends string>({
  options,
  onToggle,
  selectedOption,
}: ToggleSwitchProps<T>) => {
  const [active, setActive] = useState<T>(selectedOption);

  const handleToggle = (value: T) => {
    setActive(value);
    onToggle(value);
  };

  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <View style={styles.container}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.button, active === option && styles.activeButton]}
            onPress={() => handleToggle(option)}
          >
            <Text
              style={[
                styles.buttonText,
                active === option && styles.activeText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
        <View
          style={[
            styles.indicator,
            {
              left: `${(options.indexOf(active) / options.length) * 100}%`,
              width: `${100 / options.length}%`, // Adjust based on the number of options
            },
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
    width: "100%", // Adjust as necessary
    height: 40, // Adjust as necessary
    backgroundColor: COLORS.bg,
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
    fontSize: FONTS.small, // Adjust font size as necessary
    color: "#666",
  },
  activeButton: {
    // Optional: Add styles for active button if needed
  },
  activeText: {
    color: "#fff",
  },
  indicator: {
    position: "absolute",
    height: "100%",
    backgroundColor: COLORS.accent, // Change color as necessary
    // borderRadius: 20,
    top: 0,
  },
});

export default ToggleSwitch;
