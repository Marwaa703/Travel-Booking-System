import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StarRatingProps {
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(0);

  const handleStarPress = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate your trip</Text>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  starContainer: {
    flexDirection: "row",
  },
  starIcon: {
    marginHorizontal: 5,
  },
});
