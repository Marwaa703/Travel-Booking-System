import { Stack } from "expo-router";
import React from "react";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="adminProfile" options={{ headerShown: false }} />
      <Stack.Screen name="pending" options={{ headerShown: false }} />
      <Stack.Screen name="registerUser" options={{ headerShown: false }} />
      <Stack.Screen name="tripAnalysis" options={{ headerShown: false }} />
      <Stack.Screen name="approved" options={{ headerShown: false }} />
    </Stack>
  );
}
