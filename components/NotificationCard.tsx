/* eslint-disable react-native/no-unused-styles */
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";

type NotificationCardProps = {
  avatar: ImageSourcePropType;
  title: string;
  description: string;
  onPress: () => void;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  avatar,
  title,
  description,
  onPress,
}) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const [currentTime, setCurrentTime] = useState("");
  const [backgroundVisible, setBackgroundVisible] = useState(true); // State to manage background visibility

  const getCurrentTime = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  useEffect(() => {
    setCurrentTime(getCurrentTime());
  }, []);

  const handlePress = () => {
    setBackgroundVisible(false); // Hide background after click
    onPress(); // Call the passed onPress action
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, !backgroundVisible && styles.backgroundHidden]}
    >
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
      <Text style={styles.time}>{currentTime}</Text>
    </Pressable>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#E6F2FF", // Default background color
      padding: 25,
      // borderRadius: 10,
      // marginVertical: 10,
    },
    backgroundHidden: {
      backgroundColor: "transparent", // Hide background after click
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 5,
    },
    description: {
      color: COLORS.textSecondary,
      fontSize: 14,
    },
    time: {
      color: COLORS.textSecondary,
      fontSize: 12,
    },
  });

export default NotificationCard;
