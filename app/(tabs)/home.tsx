/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import InputField from "@/components/InputField";
import Button from "@/components/Buttons";

// import PrimaryButton from "@/src/components/PrimaryButton";
// import SecondaryButton from "@/src/components/SecondaryButton";


const Home = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Home Page</Text>
      {/* <PrimaryButton title="Text" onPress={()=>{}}></PrimaryButton>
      <SecondaryButton title="Text" onPress={()=>{}}></SecondaryButton> */}
      <InputField label="Phone Number" placeholder="Enter your phone" type="phone"></InputField>
      <Button type="primary" title="text" align="flex-start" width={"30%"} onPress={()=>{}}></Button>
      <Button type="secondary" title="text" align="flex-end" width={"90%"} onPress={()=>{}}></Button>
    </View>
  );
};

export default Home;