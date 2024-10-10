import { View, Text, Button } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import { router } from "expo-router";

//!THIS PAGE WILL BE REMOVED
//! DO NOT STYLE IT

const Profile = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Profile</Text>
      <Button
        onPress={() => {
          router.push("/(user)");
        }}
        title="User Profile"
      />
      <Button
        onPress={() => {
          router.push("/(admin)");
        }}
        title="Admin Profile"
      />
      <Button
        onPress={() => {
          router.push("/(company)");
        }}
        title="Company Profile"
      />
    </View>
  );
};

export default Profile;
