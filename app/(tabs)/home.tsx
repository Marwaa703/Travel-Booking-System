/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/theme";
import InputField from "@/src/components/InputField";

// import PrimaryButton from "@/src/components/PrimaryButton";
// import SecondaryButton from "@/src/components/SecondaryButton";


const Home = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Home Page</Text>
      {/* <PrimaryButton title="Text" onPress={()=>{}}></PrimaryButton>
      <SecondaryButton title="Text" onPress={()=>{}}></SecondaryButton> */}
      <InputField label="Name" placeholder="Enter your name"></InputField>
    </View>
  );
};

export default Home;