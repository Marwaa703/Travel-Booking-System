/* eslint-disable react-native/no-unused-styles */
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface OTPInputProps {
  code: string; // The expected OTP code to compare against
  onSubmitOtp: (isValid: boolean) => void; // Callback to return the result
}

const OTPInput: React.FC<OTPInputProps> = ({ code, onSubmitOtp }) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [borderColors, setBorderColors] = useState<string[]>(
    new Array(6).fill("#ccc"),
  ); // Default color
  const inputsRef = useRef<(TextInput | null)[]>([]); // Ref for each TextInput

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, ""); // Only allow numbers
    setOtp(newOtp);

    // Automatically focus on the next input
    if (text && index < otp.length - 1) {
      const nextInput = index + 1;
      inputsRef.current[nextInput]?.focus();
    }

    // Check if all inputs are filled
    if (newOtp.every((digit) => digit.length === 1)) {
      const enteredOtp = newOtp.join("");
      const isValid = enteredOtp === code;
      onSubmitOtp(isValid); // Pass boolean result to the parent

      // Set border colors based on validity
      setBorderColors(
        newOtp.map((_, i) =>
          i < newOtp.length ? (isValid ? "green" : "red") : "#ccc",
        ),
      );
    } else {
      setBorderColors(
        newOtp.map((_, i) => (i < newOtp.length ? "#ccc" : "#ccc")),
      );
    }
  };

  useEffect(() => {
    // Reset OTP input if code changes
    setOtp(["", "", "", "", "", ""]);
    setBorderColors(new Array(6).fill("#ccc")); // Reset border colors
  }, [code]);

  const handleDelete = (index: number) => {
    if (otp[index] === "") {
      // Move focus back if current input is empty
      focusPreviousInput(index);
    }
  };

  const focusPreviousInput = (index: number) => {
    if (index > 0) {
      inputsRef.current[index - 1]?.focus(); // Focus on the previous input
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={[styles.input, { borderColor: borderColors[index] }]} // Change border color based on state
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (inputsRef.current[index] = ref)} // Store refs for each input
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") handleDelete(index);
          }}
        />
      ))}
    </View>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    input: {
      width: 40,
      height: 50,
      borderWidth: 1,
      borderRadius: 8,
      textAlign: "center",
      fontSize: 24,
    },
  });

export default OTPInput;
