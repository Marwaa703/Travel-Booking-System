/* eslint-disable prettier/prettier */
import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";
import { COLORS } from "@/src/constants/theme";


const Login = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Log In Page</Text>
      <Button
        onPress={() => {
          router.push("/home");
        }}
        title="This button redirect to Home screen"
      />
    </View>
  );
};

export default Login;
