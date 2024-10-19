/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorPalette, COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface RatingProps {
  rate: number | null;
}

const Rating = ({ rate }: RatingProps) => {
  // If rate is null, display 5 grey stars
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  if (rate === null) {
    return (
      <View style={styles.container}>
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name="star-outline"
            size={FONTS.normal}
            color={COLORS.textSecondary}
          />
        ))}
      </View>
    );
  }

  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;

  if (rate === 0) return <Text>0</Text>;

  return (
    <View style={styles.container}>
      {[...Array(fullStars)].map((_, index) => (
        <Ionicons key={index} name="star" size={FONTS.normal} color="gold" />
      ))}
      {hasHalfStar && (
        <Ionicons name="star-half" size={FONTS.normal} color="gold" />
      )}
      {[...Array(5 - Math.ceil(rate))].map((_, index) => (
        <Ionicons
          key={index}
          name="star-outline"
          size={FONTS.normal}
          color="gray"
        />
      ))}
      <Text style={styles.rate}>{rate}</Text>
    </View>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    rate: {
      fontSize: FONTS.small,
      marginLeft: 8,
      color: COLORS.textSubtitle,
    },
  });

export default Rating;
