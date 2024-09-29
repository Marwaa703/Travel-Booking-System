/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="adminProfile" options={{ headerShown:false }} />
      <Stack.Screen name="approved" options={{ headerShown:true }} />
      <Stack.Screen name="pending" options={{ headerShown:true }} />
      <Stack.Screen name="registerUser" options={{ headerShown:true }} />
      <Stack.Screen name="tripAnalysis" options={{ headerShown:true }} />
    
    </Stack>
  );
}