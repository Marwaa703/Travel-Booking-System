import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import Spacer from "../Spacer";

interface GenderPickerProps {
  setSelectedGender: React.Dispatch<React.SetStateAction<string>>;
  selectedGender: string;
}
const GenderPicker = ({
  setSelectedGender,
  selectedGender,
}: GenderPickerProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedGender === "male" && styles.selectedButton,
        ]}
        onPress={() => setSelectedGender("male")}
      >
        <Ionicons
          name="male"
          size={20}
          color={selectedGender === "male" ? "#fff" : "#007BFF"}
        />
        <Spacer width={8} />
        <Text
          style={selectedGender === "male" ? styles.selectedText : styles.text}
        >
          Male
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedGender === "female" && styles.selectedButton,
        ]}
        onPress={() => setSelectedGender("female")}
      >
        <Ionicons
          name="female"
          size={20}
          color={selectedGender === "female" ? "#fff" : "#FF69B4"} // Light pink for female
        />
        <Spacer width={8} />
        <Text
          style={
            selectedGender === "female" ? styles.selectedText : styles.text
          }
        >
          Female
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.light,
  },
  button: {
    flex: 1,
    padding: 8,

    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  selectedButton: {
    backgroundColor: COLORS.accent, // Blue for male
  },
  text: {
    color: "#000", // Default text color
    marginTop: 5,
  },
  selectedText: {
    color: "#fff", // Text color for selected button
    marginTop: 5,
  },
});

export default GenderPicker;
