import Button from "@/components/Buttons";
import Spacer from "@/components/Spacer";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import {
  fetchCompanies,
  fetchCompanyUsers,
} from "@/redux/actions/companiesActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { isCompanyUserRole } from "@/utils";
import { router, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Toast from "react-native-toast-message";

const { height } = Dimensions.get("window");

const ExploreScreen = () => {
  // get initial data from server;

  return (
    <View style={styles.container}>
      <Toast />
      {/* Top Image */}
      <Image
        source={{
          uri: "https://img.freepik.com/premium-photo/image-beautiful-place-world_952161-62132.jpg",
        }}
        style={styles.topImage}
        resizeMode="cover"
      />

      {/* Bottom Section */}
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

        {/* Button positioned at the bottom */}
        <View style={styles.buttonContainer}>
          <Button
            type="primary"
            title="Get Started"
            width={Dimensions.get("screen").width * 0.9}
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
    backgroundColor: COLORS.bg,
  },
  topImage: {
    width: "100%",
    height: height * 0.7,
  },
  bottom: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.3,
    width: "100%",
    paddingBottom: 16, // Add padding to the bottom for some spacing
  },
  textContainer: {
    paddingHorizontal: 14,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    marginTop: -30,
    width: "100%",
  },
  title: {
    fontSize: FONTS.xxlarge,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
    color: COLORS.textPrimary,
  },
  exploreText: {
    color: "#FF6F3D",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExploreScreen;
