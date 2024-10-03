import ReduxProvider from "@/redux/RootProvider";
import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <ReduxProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ReduxProvider>
  );
};
export default RootLayout;
