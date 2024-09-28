/* eslint-disable prettier/prettier */
import { View, Text, Button } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import { router } from "expo-router";


const Blogs = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Blogs</Text>
      <Button
        onPress={() => {
          router.push("/blogsDetails");
        }}
        title="See Popular Trips "
      />
    </View>
  );
};

export default Blogs;
