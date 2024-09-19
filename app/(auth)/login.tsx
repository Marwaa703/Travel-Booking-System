/* eslint-disable prettier/prettier */
import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";
import { colors } from "@/constants/theme";

const Login = () => {
  return (
    <View>
      <Text style={{ color: colors.primary }}>Log In Page</Text>
      <Button
        onPress={() => {
          router.push("/home");
        }}
        title="This button redirect to Login screen"
      />
    </View>
  );
};

export default Login;
