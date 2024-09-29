/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="adminProfile" options={{ headerShown:false }} />
    
    </Stack>
  );
}