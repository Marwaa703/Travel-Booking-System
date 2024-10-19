/* eslint-disable react-native/no-unused-styles */
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import Like from "@/components/Like";
import CardSubtitle from "./CardSubtitle";
import icons from "@/constants/icons";
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface CardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}

const FavoriteCard: React.FC<CardProps> = ({ image, title, subtitle }) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <CardSubtitle
          text={subtitle}
          icon={icons.location}
          iconColor={theme.textSecondary}
        ></CardSubtitle>
      </View>

      <View style={styles.iconContainer}>{/* <Like tripId={}></Like> */}</View>
    </View>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    cardContainer: {
      width: 200,
      height: 250,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "#fff",
      elevation: 15, // for shadow on Android
      shadowColor: "#000", // for shadow on iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.9,
      shadowRadius: 2,
      margin: 15,
      position: "relative",
    },
    imageContainer: {
      width: "100%",
      height: "70%",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "90%",
      height: "90%",
      alignSelf: "center",
      borderRadius: 10,
    },
    textContainer: {
      padding: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },

    iconContainer: {
      position: "absolute",
      top: 15,
      right: 15,
      padding: 5,
    },
  });

export default FavoriteCard;
