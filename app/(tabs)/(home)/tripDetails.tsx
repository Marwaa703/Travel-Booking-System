/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/Buttons";
import { router } from "expo-router";



const TripDetails = () => {
  return (
    <View>
      <Text >User Favorites Trips  </Text>
      <Text >NOTE: {"\n"} This Route will be inside OnPress in "TouchableOpacity" that wrapped the Trip Card Component , this is not gonna be a button, {"\n"} I just put it like that for Clarity</Text>
      <Button title={"See on Map"} onPress={()=>{router.push("/tripMap")}}/>
      <Button title={"Book Trip"} onPress={()=>{router.push("/payment")}}/>
    </View>
  );
};

export default TripDetails;
