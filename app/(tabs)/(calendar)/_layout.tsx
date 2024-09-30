/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

 const CalendarLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="calendarHome" options={{ headerShown: false }} />
        <Stack.Screen name="tripIns" options={{ headerShown: true }} />

      </Stack>
  );
}

export default CalendarLayout;