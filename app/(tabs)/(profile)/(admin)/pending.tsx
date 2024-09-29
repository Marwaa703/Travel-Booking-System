/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";


const Pending = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Pending Requests </Text>
    </View>
  );
};

export default Pending;
