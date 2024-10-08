import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useAppSelector } from "@/redux/store";
import { isCompanyUserRole } from "@/utils";

const AuthLayout = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.currentUser) {
      // Optionally handle unauthenticated state
      return;
    }
    if (auth.role === "User") {
      router.replace("/(tabs)/(profile)/(user)/userProfile");
    } else if (auth.role === "Admin") {
      router.replace("/(tabs)/(profile)/(admin)/adminProfile");
    } else if (isCompanyUserRole(auth.role)) {
      router.replace("/(tabs)/(profile)/(company)/companyProfile");
    } else {
      router.replace("(tabs)/home");
    }
  }, [auth, router]);
  console.log({ auth: auth.isAuthenticated });
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
