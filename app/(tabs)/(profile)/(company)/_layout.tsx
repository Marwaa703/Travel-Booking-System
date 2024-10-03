/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

export default function CompanyLayout() {
  return (
    <Stack>
      <Stack.Screen name="companyProfile" options={{ title: 'Company Profile' ,headerShown: false}} />
      <Stack.Screen name="companyHome" options={{ headerShown: false}} />
      <Stack.Screen name="addTrip" options={{ title: 'Add Trip' }} />

    </Stack>
  );
}