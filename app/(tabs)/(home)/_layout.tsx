import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="popularTrips"
        options={{ headerShown: true, title: "Popular Trips" }}
      />
      <Stack.Screen
        name="popularCompanies"
        options={{ headerShown: true, title: "Popular Companies" }}
      />
      <Stack.Screen name="tripMap" options={{ headerShown: true }} />
      <Stack.Screen name="payment" options={{ headerShown: true }} />
      <Stack.Screen name="tripDetails" options={{ headerShown: false }} />
      <Stack.Screen name="notification" options={{ headerShown: false }} />
    </Stack>
  );
};
export default HomeLayout;
