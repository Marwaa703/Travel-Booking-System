import { View, Text, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import Header from "@/components/core/Header";
import Card from "@/components/Card";
import { COLORS, SPACING } from "@/constants/theme";
import { useAppSelector } from "@/redux/store";
import { router } from "expo-router";

const PerviousTrip = () => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.medium,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  noTripsText: {
    textAlign: "center",
    marginTop: SPACING.xlarge,
    fontSize: 24,
    color: COLORS.primary,
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
