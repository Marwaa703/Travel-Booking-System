/* eslint-disable react-native/no-unused-styles */
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface StarRatingProps {
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  onRatingChange,
}) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const [rating, setRating] = useState<number>(0);

  const handleStarPress = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        {[...Array(maxStars)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleStarPress(index + 1)}
          >
            <Ionicons
              name={index < rating ? "star" : "star-outline"}
              size={40}
              color={index < rating ? "#ffcc00" : "#ccc"}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StarRating;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },

    starContainer: {
      flexDirection: "row",
    },
    starIcon: {
      marginHorizontal: 5,
    },
  });
