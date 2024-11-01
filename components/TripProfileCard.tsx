/* eslint-disable react-native/no-unused-styles */
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import Rating from "./Rating";
import { ColorPalette, COLORS, FONTS } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import CardSubtitle from "./CardSubtitle";
import { useNavigation, useRouter } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@/hooks/useTheme";
const defaultImage = require("../assets/imgDefault.png");
interface TripProfileCardProps {
  id: number;
  image: string;
  title: string;
  date: string;
  rating: number;
  price: number;
  peopleJoined: number;
  avatars: ImageSourcePropType[];
  caller: string;
}

const TripProfileCard: React.FC<TripProfileCardProps> = ({
  id,
  image,
  title,
  date,
  rating,
  price,
  peopleJoined,
  avatars,
  caller,
}) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const router = useRouter();
  const handlePress = () => {
    if (caller === "calendar") {
      navigation.navigate("tripIns", { tripId: id });
    } else {
      // navigation.navigate("tripDetails", { tripId: id });
      router.push(`tripDetails?id=${id}`);
    }
  };
  const imageSource = image ? { uri: image } : defaultImage;
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      {/* Image Section */}
      <Image source={imageSource} style={styles.image} />
      {/* Text and Info Section */}
      <View style={styles.infoContainer}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>
        {/* Date */}
        <View style={styles.dateContainer}>
          <CardSubtitle
            icon={"calendar"}
            iconColor={COLORS.textSecondary}
            text={date}
          />
        </View>
        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Rating rate={rating}></Rating>
        </View>
        {/* People Joined */}
        <View style={styles.peopleContainer}>
          <View style={styles.avatarsContainer}>
            {avatars.map((avatar, index) => (
              <Image key={index} source={avatar} style={styles.avatar} />
            ))}
          </View>
          <Text style={styles.peopleText}>{peopleJoined} Person Joined</Text>
        </View>
      </View>
      {/* Price Tag */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>EGP {price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.bg_surface,
      borderRadius: 10,
      padding: 10,
      elevation: 3, // Shadow for Android
      shadowColor: "#000", // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      position: "relative",
    },
    image: {
      width: 100,
      height: 120,
      borderRadius: 10,
    },
    infoContainer: {
      flex: 1,
      marginLeft: 15,
    },
    title: {
      fontSize: FONTS.normal,
      // fontWeight: "bold",
      color: COLORS.textPrimary,
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 5,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 10,
    },
    peopleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
    },
    avatarsContainer: {
      flexDirection: "row",
      marginRight: 15,
    },
    avatar: {
      width: 25,
      height: 25,
      borderRadius: 12.5,
      marginRight: -10, // Overlap avatars
    },
    peopleText: {
      fontSize: FONTS.small,
      color: COLORS.textSubtitle,
    },
    priceContainer: {
      backgroundColor: COLORS.priceTag,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 15,
      position: "absolute",
      right: 10,
      top: 10,
    },
    priceText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "bold",
    },
  });

export default TripProfileCard;
