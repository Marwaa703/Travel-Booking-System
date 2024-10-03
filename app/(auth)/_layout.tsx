import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{ headerTitle: "", headerBackground: () => null }}
        />
        <Stack.Screen
          name="signup"
          options={{ headerTitle: "", headerBackground: () => null }}
        />
        <Stack.Screen
          name="signup_company"
          options={{ headerTitle: "", headerBackground: () => null }}
        />
        <Stack.Screen
          name="forget_password"
          options={{ headerTitle: "", headerBackground: () => null }}
        />
        <Stack.Screen
          name="otp"
          options={{ headerTitle: "", headerBackground: () => null }}
        />
      </Stack>
      <StatusBar backgroundColor={"#161622"} style="light" />
    </>
  );
};

export default AuthLayout;
