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
      <Stack.Screen name="companyTrips" options={{ headerShown: false }} />
      <Stack.Screen name="companyUsers" options={{ headerShown: false }} />
      <Stack.Screen name="addTrip" options={{ headerShown: false }} />
      <Stack.Screen name="addUser" options={{ headerShown: false }} />
      <Stack.Screen name="editUser" options={{ headerShown: false }} />
      <Stack.Screen name="addTrip" options={{ title: "Add New Trip" }} />
      <Stack.Screen name="addUser" options={{ title: "Add New User" }} />
      <Stack.Screen name="editUser" options={{ title: "Edit User Data" }} />
      <Stack.Screen
        name="editCompany"
        options={{ title: "Edit Company Data" }}
      />
      <Stack.Screen name="tripInstruction" options={{ headerShown: false }} />
    </Stack>
  );
}
