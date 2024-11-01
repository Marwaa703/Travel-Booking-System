import { Stack } from "expo-router";
import React from "react";

const CalendarLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="calendarHome" options={{ headerShown: false }} />
      <Stack.Screen name="tripIns" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CalendarLayout;
