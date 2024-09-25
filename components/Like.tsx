/* eslint-disable prettier/prettier */

import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/theme";

const Like = () => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
    // todo: handle redux
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
        name={liked ? "heart" : "heart-outline"}
        size={14}
        color={liked ? "red" : "white"}
      />
    </TouchableOpacity>
  );
};

export default Like;

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: COLORS.opacity,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
