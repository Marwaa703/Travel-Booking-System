/* eslint-disable prettier/prettier */
import Button from "@/components/Buttons";
import Spacer from "@/components/Spacer";
import { FONTS, SPACING } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image
        source={{
          uri: "https://img.freepik.com/premium-photo/image-beautiful-place-world_952161-62132.jpg",
        }}
        style={styles.topImage}
        resizeMode="cover"
      />

      {/* Text Content */}
      <View style={styles.bottom}>
        <View style={styles.textContainer}>
          <Spacer />
          <Text style={styles.title}>
            It's a big world out there, go{" "}
            <Text style={styles.exploreText}>explore</Text>
          </Text>
          <Text style={styles.subtitle}>
            To get the best of your adventure, leave and go where you like.
            waiting for you.
          </Text>
        </View>
        <Spacer />
        {/* Button positioned at the bottom */}
        <View style={{ width: "90%" }}>
          <Button
            type="primary"
            title="Get Started"
            width={"100%"}
            onPress={() => {
              router.push("/login");
            }}
            align="center"
          />
          <Spacer height={SPACING.large} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topImage: {
    width: "100%",
    height: height * 0.7,
  },
  bottom: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: height * 0.3,
    width: "100%",
  },
  textContainer: {
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    marginTop: -30,
    width: "100%",
  },
  title: {
    fontSize: FONTS.xlarge,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 18,
  },
  exploreText: {
    color: "#FF6F3D",
  },
  subtitle: {
    fontSize: 16,
    color: "#7a7a7a",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default ExploreScreen;
