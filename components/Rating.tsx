/* eslint-disable prettier/prettier */
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONTS } from "@/constants/theme";

interface RatingProps {
  rate: number;
}

const Rating = ({ rate }: RatingProps) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
if(rate ===0 ) return <Text>0</Text>
  return (
    <View style={styles.container}>
      {[...Array(fullStars)].map((_, index) => (
        <Ionicons key={index} name="star" size={FONTS.normal} color="gold" />
      ))}
      {hasHalfStar && <Ionicons name="star-half" size={FONTS.normal} color="gold" />}
      {[...Array(5 - Math.ceil(rate))].map((_, index) => (
        <Ionicons key={index} name="star-outline" size={FONTS.normal} color="gray" />
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
    fontSize: FONTS.small,
    marginLeft: 8,
  },
});

export default Rating;
