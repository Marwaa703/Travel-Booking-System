/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="popularTrips" options={{ headerShown: true }} />
        <Stack.Screen name="popularCompanies" options={{ headerShown: true }} />
      </Stack>
 
  );
};
export default HomeLayout;

