/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";


const Approved = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Approved Companies</Text>
    </View>
  );
};

export default Approved;
