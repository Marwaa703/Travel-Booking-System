/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen name="userProfile" options={{ headerShown: false }} />
      <Stack.Screen name="userEdit" options={{ headerShown: false }} />
      <Stack.Screen name="favTrip" options={{ headerShown: false }} />
      <Stack.Screen name="perviousTrip" options={{ headerShown: false }} />
    </Stack>
  );
}
