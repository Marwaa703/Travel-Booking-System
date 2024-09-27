/* eslint-disable prettier/prettier */
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from 'react-native';
import {COLORS, FONTS} from "../../constants/theme"

//^when typing mode is on ,The tab bar does not disappear

type RouteName = "home" | "calendar" | "search" | "blogs" | "profile";

const Layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          let isSearchIcon = route.name === "search" as RouteName;
          switch (route.name as RouteName) {
            case "home":
              iconName = "home-outline";
              break;
            case "calendar":
              iconName = "calendar-outline";
              break;
            case "search":
              iconName = "search-outline";
              break;
            case "blogs":
              iconName = "book-outline";
              break;
            case "profile":
              iconName = "person-outline";
              break;
            default:
              iconName = "home-outline";
              break;
          }

          return (
            <View
              style={{
                backgroundColor: isSearchIcon ? COLORS.accent : "transparent",
                borderRadius: isSearchIcon ? 50 : 0, 
                width: isSearchIcon ? 50 : 'auto', 
                height: isSearchIcon ? 50 : 'auto', 
                justifyContent: 'center',
                alignItems: 'center', 
                shadowColor: isSearchIcon ?  COLORS.accent  : "transparent", 
                shadowOpacity: isSearchIcon ? 0.6 : 0, 
                shadowOffset: { width: 0, height: 5 }, 
                shadowRadius: isSearchIcon ? 10 : 0, 
                elevation: isSearchIcon ? 10 : 0, 
                marginBottom: isSearchIcon ? 30 : 0,
              }}
            >
              <Ionicons
                name={iconName as never} 
                size={isSearchIcon ? 25 : 25} 
                color={isSearchIcon ? COLORS.background : color} 
              />
            </View>
          );
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          backgroundColor:"#fff",
          height: 90,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 20,
          elevation: 5, 
        },
        tabBarActiveTintColor:  COLORS.primary, 
        tabBarInactiveTintColor: COLORS.textSecondary, 
        tabBarLabelStyle: {
          fontSize: FONTS.small,
          paddingBottom: 15, 
        },
        tabBarItemStyle: {
          paddingTop: 15, 
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
      <Tabs.Screen
        name="search"
        options={{ 
          title: "Search", 
          tabBarLabel: () => null, 
        }}
      />
      <Tabs.Screen name="blogs" options={{ title: "Blogs" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default Layout;
