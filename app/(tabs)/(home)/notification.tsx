/* eslint-disable react-native/no-unused-styles */

import { ScrollView, View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Header from "@/components/core/Header";
import NotificationCard from "@/components/NotificationCard";
import { router } from "expo-router";
import LinkButton from "@/components/LinkButton";
import { ColorPalette, FONTS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const initialNotifications = new Array(20).fill({
  avatar: {
    uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671138.jpg?size=626&ext=jpg",
  },
  title: "Super Offer",
  description: "Get 60% off in our first booking",
});

const Notification = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);

  const [notifications, setNotifications] = useState(initialNotifications);

  return (
    <View style={styles.container}>
      <Header
        leftIcon="arrow-back"
        rightIcon="trash-outline"
        onLeftIconPress={() => router.push("home")}
        onRightIconPress={() => setNotifications([])}
        title="Notification"
      />
      <View style={styles.linksContainer}>
        <LinkButton label="Recent" to={"/notification"} />
        <LinkButton label="Earlier" to={"/notification"} />
        <LinkButton label="Archieved" to={"/notification"} />
      </View>
      {notifications.length > 0 ? (
        <ScrollView>
          {notifications.map((notification, index) => (
            <View key={index}>
              <NotificationCard
                avatar={notification.avatar}
                title={notification.title}
                description={notification.description}
                onPress={() => {}}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>No Notifications</Text>
        </View>
      )}
    </View>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    linksContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 20,
    },
    noNotificationsContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noNotificationsText: {
      fontSize: FONTS.normal,
      color: "gray",
    },
  });

export default Notification;
