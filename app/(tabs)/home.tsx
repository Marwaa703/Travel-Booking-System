/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/theme";
import PrimaryButton from "@/src/components/PrimaryButton";
import SecondaryButton from "@/src/components/SecondaryButton";


const Home = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Home Page</Text>
      <PrimaryButton title="Text" onPress={()=>{}}></PrimaryButton>
      <SecondaryButton title="Text" onPress={()=>{}}></SecondaryButton>
    </View>
  );
};

export default Home;