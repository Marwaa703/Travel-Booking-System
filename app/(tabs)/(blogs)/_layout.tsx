/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";

const BlogsLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="blogs" options={{ headerShown: true }} />
        <Stack.Screen name="blogsDetails" options={{ headerShown: true }} />
      </Stack>
 
  );
};
export default BlogsLayout;

