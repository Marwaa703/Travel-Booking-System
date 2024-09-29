/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

export const CalendarLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="calendarHome" options={{ headerShown: true }} />
        <Stack.Screen name="tripIns" options={{ headerShown: true }} />
   
      </Stack>
  );
}