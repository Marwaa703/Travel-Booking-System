/* eslint-disable react-native/no-unused-styles */
import React from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";
import { ColorPalette } from "@/constants/theme";

const screenWidth = Dimensions.get("window").width;

type CategoryCardProps = {
  title: string;
  image: string;
  onPress: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  onPress,
}) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.3)"]}
          style={styles.gradient}
        >
          <Text style={styles.categoryText}>{title}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    cardContainer: {
      width: screenWidth * 0.8,
      height: 200,
      marginHorizontal: 10,
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 5,
    },
    imageBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    gradient: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    categoryText: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default CategoryCard;
