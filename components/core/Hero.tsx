import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS } from "@/constants/theme";
const octaLg = require("@/assets/vectors/octa-lg.png");
const octaSm = require("@/assets/vectors/octa-sm.png");
const traveller = require("@/assets/vectors/traveller.png");
const Hero = () => {
  return (
    <LinearGradient
      colors={["#F15F03", "#FFB88B"]}
      //   colors={["red", "#FFB88B"]}
      start={{ x: 0, y: 0 }} // Top left corner
      end={{ x: 1, y: 1 }} // Bottom left corner
      style={styles.gradient} // Add styles to the gradient
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.hero}>Explore the Beautiful World!</Text>
          <Text style={styles.subtitle}>
            small catchy text has ss sssss sere
          </Text>
        </View>
        <Image style={styles.traveller} source={traveller} />
      </View>
      <Image style={styles.octaSmall} source={octaSm} />
      <Image style={styles.octaLarge} source={octaLg} />
    </LinearGradient>
  );
};

export default Hero;

const styles = StyleSheet.create({
  gradient: {
    flex: 1, // Ensures the gradient covers the entire view
    width: "100%",
    height: 150,
    borderRadius: 12,
    position: "relative",
    overflow: "hidden",
  },
  octaSmall: {
    overflow: "hidden",
    width: 100,
    height: 140,
    position: "absolute",
    zIndex: 20,
    top: -50,
    left: 0,
    transform: "rotate(20deg)",
  },
  octaLarge: {
    position: "absolute",
    width: 130,
    height: 120,
    right: 0,
    bottom: 0,
  },
  hero: {
    fontSize: FONTS.xlarge,
    color: COLORS.light,
    zIndex: 100,
  },
  subtitle: {
    fontSize: FONTS.small,
    color: COLORS.light,
    zIndex: 100,
    width: "70%",
  },
  container: {
    paddingHorizontal: 12,
    width: "100%",
    height: "100%",
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  content: {
    width: "70%",
    zIndex: 22,
  },
  traveller: {
    // flex: 1,
    zIndex: 22,
    width: "30%",
    height: "100%",
    marginRight: 18,
  },
});