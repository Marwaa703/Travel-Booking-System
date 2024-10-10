import { Stack } from "expo-router";
import React from "react";

export default function CompanyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="companyProfile"
        options={{ title: "Company Profile", headerShown: false }}
      />
      <Stack.Screen
        name="companyDetails"
        options={{ title: "Company Details", headerShown: false }}
      />
      <Stack.Screen name="companyHome" options={{ headerShown: false }} />
      <Stack.Screen name="addTrip" options={{ title: "Add Trip" }} />
    </Stack>
  );
}
