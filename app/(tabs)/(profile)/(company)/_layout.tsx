/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

export default function CompanyLayout() {
  return (
    <Stack>
      <Stack.Screen name="companyProfile" options={{ title: 'Company Profile' }} />
      <Stack.Screen name="companyHome" options={{ title: 'Company Home' }} />
    
    </Stack>
  );
}
