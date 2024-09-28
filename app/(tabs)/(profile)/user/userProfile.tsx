/* eslint-disable prettier/prettier */

import { View, Text, Button } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import { router } from "expo-router";


const userProfile = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}> User Profile</Text>
      <Button
        onPress={() => {
          router.push("userEdit");
        }}
        title="Edit Profile"
      />
    </View>
  );
};

export default userProfile;
