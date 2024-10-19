/* eslint-disable react-native/no-unused-styles */
import { View, Text, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import Header from "@/components/core/Header";
import Card from "@/components/Card";
import { ColorPalette, COLORS, SPACING } from "@/constants/theme";
import { useAppSelector } from "@/redux/store";
import { router } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

const PerviousTrip = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const previousTrips = useAppSelector((state) => state.trips.previousTrips);
  const { trips: tripImgs } = useAppSelector((state) => state.trips);

  if (!Array.isArray(previousTrips) || previousTrips.length === 0) {
    return (
      <>
        <Header title="Previous Trips" />
        <View style={styles.container}>
          <Text style={styles.noTripsText}>No previous trips found.</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Header
        title="Previous Trips"
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
      <View style={styles.container}>
        <FlatList
          data={previousTrips}
          renderItem={({ item }) => {
            const tripWithImages = tripImgs.find(
              (trip) => trip.trip_id === item.id,
            );

            const firstImageUrl =
              tripWithImages && tripWithImages.images.length > 0
                ? tripWithImages.images[0].image_url
                : null;
            return (
              <View style={styles.cardContainer}>
                <Card
                  id={item.id}
                  image={firstImageUrl}
                  title={item.name}
                  subtitle={item.description}
                  rating={item.rate}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.trip_id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.scrollContainer}
        />
      </View>
    </>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: SPACING.medium,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.bg,
    },
    noTripsText: {
      textAlign: "center",
      marginTop: SPACING.xlarge,
      fontSize: 24,
      color: COLORS.accent,
    },
    cardContainer: {
      marginRight: SPACING.small,
      width: Dimensions.get("screen").width * 0.44,
    },
    columnWrapper: {
      justifyContent: "space-between",
      marginBottom: 10,
    },
    scrollContainer: {
      paddingBottom: SPACING.large,
    },
  });

export default PerviousTrip;
