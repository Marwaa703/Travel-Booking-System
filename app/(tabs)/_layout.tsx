/* eslint-disable react-native/no-unused-styles */

import React from "react";
import { Dimensions, View } from "react-native";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/theme";
import { useTheme } from "@/hooks/useTheme";

type RouteName = "(home)" | "(calendar)" | "search" | "(blogs)" | "(profile)";

const Layout = () => {
  // configure styles
  const theme = useTheme();
  // const styles = stylesObj(theme);
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          const isSearchIcon = route.name === ("search" as RouteName);

          switch (route.name as RouteName) {
            case "(home)":
              iconName = "home-outline";
              break;
            case "(calendar)":
              iconName = "calendar-outline";
              break;
            case "search":
              iconName = "search-outline";
              break;
            case "(blogs)":
              iconName = "book-outline";
              break;
            case "(profile)":
              iconName = "person-outline";
              break;
            default:
              iconName = "home-outline";
              break;
          }

          return (
            <View
              style={{
                backgroundColor: isSearchIcon ? theme.accent : "transparent",
                borderRadius: isSearchIcon ? 28 : 0,
                width: isSearchIcon ? 58 : "auto",
                height: isSearchIcon ? 58 : "auto",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: isSearchIcon ? theme.accent : "transparent",
                shadowOpacity: isSearchIcon ? 0.6 : 0,
                shadowOffset: { width: 0, height: 5 },
                shadowRadius: isSearchIcon ? 10 : 0,
                elevation: isSearchIcon ? 10 : 0,
                marginBottom: isSearchIcon ? 25 : 0,
              }}
            >
              <Ionicons
                name={iconName as never}
                size={isSearchIcon ? 30 : 25}
                color={isSearchIcon ? theme.bg : color}
              />
            </View>
          );
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 0,

          backgroundColor: theme.bg_surface,
          // height: 80,
          height: 80,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 15,
          elevation: 5,
          width: Dimensions.get("window").width,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: {
          fontSize: 10,
          paddingBottom: 20,
        },
        tabBarItemStyle: {
          paddingTop: 20,
        },
      })}
    >
      <Tabs.Screen
        name="(home)"
        options={{ headerShown: false, title: "Home" }}
      />
      <Tabs.Screen
        name="(calendar)"
        options={{ headerShown: false, title: "Calendar" }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="(blogs)"
        options={{ headerShown: false, title: "Blogs" }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{ headerShown: false, title: "Profile" }}
      />
    </Tabs>
  );
};

export default Layout;
