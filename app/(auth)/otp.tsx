import React, { useState } from "react";
import Spacer from "@/components/Spacer";
import Padding from "@/components/containers/Padding";
import { StyleSheet, Text, View } from "react-native";
import { SPACING, FONTS, COLORS } from "@/constants/theme";
import Button from "@/components/Buttons";
import FieldErrorMessage from "@/components/forms/FieldErrorMessage";
import { useGlobalSearchParams, useRouter } from "expo-router";
import OTPInput from "@/components/forms/OtpInput";
import Header from "@/components/core/Header";

const Otp = () => {
  const router = useRouter();
  const { email } = useGlobalSearchParams();

  const [error, setError] = useState("");
  const [isOtpValid, setIsOtpValid] = useState<boolean | null>(null);

  const handleOtp = (isvalid: boolean) => {
    console.log({ isvalid });
    setIsOtpValid(isvalid);
  };

  const handleVerifyOtp = () => {
    if (isOtpValid !== null) {
      if (isOtpValid) {
        console.log("OTP is valid for:", email);
        // Navigate to login
        router.replace("/login");
      } else {
        setError("Invalid OTP for: " + email);
        console.log("Invalid OTP for:", email);
        // Show an error message or handle accordingly
      }
    } else {
      console.log("Please enter OTP before verifying.");
      setError("Please enter OTP before verifying.");
    }
  };
  return (
    <>
      <Header title="OTP Verification" rightIcon="" leftIcon="" />
      <Padding>
        <View style={styles.container}>
          <View style={styles.header}>
            {/* <Text style={styles.title}>OTP Verification</Text> */}
            <Spacer />
            <Text
              style={styles.subTitle}
            >{`Please check your email ${email ? email : ""} to see the verification code`}</Text>
          </View>
          <Spacer height={0} />
          <OTPInput onSubmitOtp={handleOtp} code="511226" />
          <FieldErrorMessage error={error} />
          <View style={styles.btnContainer}>
            <Button
              title="Reset Password"
              type="primary"
              onPress={handleVerifyOtp}
            />
          </View>
        </View>
      </Padding>
    </>
  );
};

export default Otp;

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
