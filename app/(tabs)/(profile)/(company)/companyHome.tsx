/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import Button from "@/components/Buttons";
import { router } from "expo-router";

const CompanyHome = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Here You can see your Trips......</Text>
      <Button title={"Add Trip"} onPress={()=>{router.push("/addTrip")}}/>
    </View>
  );
};

export default CompanyHome;
