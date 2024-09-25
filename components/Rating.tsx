import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface RatingProps {
  rate: number;
}

const Rating = ({ rate }: RatingProps) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;

  return (
    <View style={styles.container}>
      {[...Array(fullStars)].map((_, index) => (
        <Ionicons key={index} name="star" size={16} color="gold" />
      ))}
      {hasHalfStar && <Ionicons name="star-half" size={16} color="gold" />}
      {[...Array(5 - Math.ceil(rate))].map((_, index) => (
        <Ionicons key={index} name="star-outline" size={16} color="gray" />
      ))}

      <Text style={styles.rate}>{rate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rate: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default Rating;
