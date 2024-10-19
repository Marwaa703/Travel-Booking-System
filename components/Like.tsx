/* eslint-disable react-native/no-unused-styles */
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorPalette } from "../constants/theme";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toggleFavorite } from "@/redux/slices/tripsSlice";
import { useTheme } from "@/hooks/useTheme";
interface LikeProps {
  tripId: string;
}
const Like = ({ tripId }: LikeProps) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(
    (state) => state.trips.trips.find((t) => t.trip_id === tripId)?.isFavorite,
  );
  const handleLike = () => {
    // todo: handle redux
    dispatch(toggleFavorite(tripId));
    // todo: update api once
    // rating can't be modified
  };
  return (
    <TouchableOpacity
      // uncomment after testing
      //   disabled={liked}
      onPress={handleLike}
      style={styles.container}
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={20}
        color={isFavorite ? "red" : "white"}
      />
    </TouchableOpacity>
  );
};

export default Like;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      width: 30,
      height: 30,
      borderRadius: 50,
      backgroundColor: COLORS.opacity,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
