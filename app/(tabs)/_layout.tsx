/* eslint-disable prettier/prettier */
import React from "react";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 0, // Adjust the distance from the bottom
          // left: 20, // Adjust left spacing
          // right: 20, // Adjust right spacing
          elevation: 8, // Add shadow for floating effect
          backgroundColor: "#fff", // Customize the background color
          borderTopStartRadius: 20, // Rounded corners
          borderTopEndRadius: 20, // Rounded corners
          height: 50, // Customize height of tab bar
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 20,
        },
        // tabBarShowLabel: false, // Hide labels if needed
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="blogs" options={{ title: "Blogs" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default Layout;
