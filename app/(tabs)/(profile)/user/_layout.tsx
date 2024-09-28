/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen name="userProfile" options={{ title: 'User Profile' }} />
      <Stack.Screen name="userEdit" options={{ title: 'User Edit' }} />
    </Stack>
  );
}
