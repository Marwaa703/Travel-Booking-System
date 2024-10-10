import ReduxProvider from "@/redux/RootProvider";
import { store } from "@/redux/store";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage your auth state

  // This effect can be triggered when the logout action is dispatched
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      setIsLoggedIn(state.auth.isAuthenticated);
    });

    return () => unsubscribe();
  }, []);
  return (
    <ReduxProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </ReduxProvider>
  );
};
export default RootLayout;
