/* eslint-disable prettier/prettier */

import { View, Text, Button } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import { router } from "expo-router";


const companyProfile = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}> Company Profile</Text>
      <Button
        onPress={() => {
          router.push("companyHome");
        }}
        title="Go to Your Home "
      />
    </View>
  );
};

export default companyProfile;
