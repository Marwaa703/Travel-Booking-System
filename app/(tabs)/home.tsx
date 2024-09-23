/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/theme";


const Home = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Home Page</Text>
    </View>
  );
};

export default Home;