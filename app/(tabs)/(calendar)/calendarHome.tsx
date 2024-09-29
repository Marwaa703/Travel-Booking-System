/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import Button from "@/components/Buttons";
import { router } from "expo-router";


const Calendar = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Calendar</Text>
      <Button title={" Trip Instruction"} onPress={()=>{router.push("/trip_ins")}}/>

    </View>
  );
};

export default Calendar;
