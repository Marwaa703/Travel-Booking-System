/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/theme";
import InputField from "@/src/components/InputField";
import Button from "@/src/components/Buttons";

// import PrimaryButton from "@/src/components/PrimaryButton";
// import SecondaryButton from "@/src/components/SecondaryButton";


const Home = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Home Page</Text>
      {/* <PrimaryButton title="Text" onPress={()=>{}}></PrimaryButton>
      <SecondaryButton title="Text" onPress={()=>{}}></SecondaryButton> */}
      <InputField label="Phone Number" placeholder="Enter your phone" type="phone"></InputField>
      <Button type="primary" title="text" onPress={()=>{}}></Button>
      <Button type="secondary" title="text" onPress={()=>{}}></Button>
    </View>
  );
};

export default Home;