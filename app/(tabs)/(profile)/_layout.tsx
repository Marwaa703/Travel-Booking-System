import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen name="profile" options={{ headerShown: true }} /> */}
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      <Stack.Screen name="(company)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>

    //^After Adding the Roles
    //   const { userType } = useUser();
    //   if (userType === 'admin') {
    //     return <Stack.Screen name="admin" />;
    //   } else if (userType === 'company') {
    //     return <Stack.Screen name="company" />;
    //   } else {
    //     return <Stack.Screen name="user" />;
    //   }
    // }
  );
};
export default ProfileLayout;
