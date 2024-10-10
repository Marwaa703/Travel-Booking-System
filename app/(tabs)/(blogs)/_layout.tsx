import { Stack } from "expo-router";
import React from "react";

const BlogsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="blogs" options={{ headerShown: false }} />
      <Stack.Screen
        name="blogDetails"
        options={{ headerShown: false, title: "Post" }}
      />
    </Stack>
  );
};
export default BlogsLayout;
