import React, { useState } from "react";
import Spacer from "@/components/Spacer";
import TextInputField from "@/components/forms/TextInputField";
import Padding from "@/components/containers/Padding";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SPACING, FONTS, COLORS } from "@/constants/theme";
import Button from "@/components/Buttons";
import FieldErrorMessage from "@/components/forms/FieldErrorMessage";
import { useRouter } from "expo-router";
import { emailRegex } from "@/constants/regext";
import Header from "@/components/core/Header";

const ForgetPass = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (!emailRegex.test(email))
      setError("Please enter a valid email address??");
    else {
      // send generated opt and send it to mail after checking if it is registered
      console.log({ email });
      setEmail("");
      setError("");

      Alert.alert(
        "Check your email",
        "We have sent password recovery instructions to your email.",
        [
          {
            text: "Resend",
            onPress: () => console.log("User requested to resend instructions"),
          },
          {
            text: "I got the key",
            onPress: () => router.push({ pathname: "otp", params: { email } }),
            style: "cancel", // Optional: styles the button as a cancel action
          },
        ],
        { cancelable: false }, // Optional: prevents dismissing the alert by tapping outside
      );

      // todo: navigate back
    }
  };
  return (
    <>
      <Header title="Forget Password" rightIcon="" leftIcon="" />
      <Padding>
        <View style={styles.container}>
          {/* header */}
          {/* <View style={styles.top}> */}
          <View style={styles.header}>
            {/* <Text style={styles.title}>Forget Password</Text> */}
            <Spacer />
            <Text style={styles.subTitle}>
              Enter your email address to reset your password
            </Text>
          </View>
          <TextInputField
            keyboardType="email-address"
            name="email"
            onBlur={() => {}}
            onChangeText={setEmail}
            value={email}
            icon="mail"
            placeholder="myname@mail.com"
          />
          <FieldErrorMessage error={error} />
          <View style={styles.btnContainer}>
            <Button
              title="Reset Password"
              type="primary"
              onPress={handleResetPassword}
            />
          </View>
        </View>
      </Padding>
    </>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "12%",
    justifyContent: "flex-start",
    rowGap: SPACING.xxlarge,
    marginBottom: SPACING.large,
  },

  header: {
    textAlign: "center",
    alignItems: "center",
    height: "15%",
  },
  title: {
    fontSize: FONTS.xlarge,
  },
  subTitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSubtitle,
    textAlign: "center",
  },
  btnContainer: {
    width: "100%",
  },
});
