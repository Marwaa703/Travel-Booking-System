/* eslint-disable react-native/no-unused-styles */
import { View, Text, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "@/components/core/Header";
import Card from "@/components/Card";
import { ColorPalette, COLORS, SPACING } from "@/constants/theme";
import { selectFavoriteTrips } from "@/redux/slices/tripsSlice";
import { useAppSelector } from "@/redux/store";
import { router, useRouter } from "expo-router";
import ScreenWraper from "@/components/containers/ScreenWraper";
import { useTheme } from "@/hooks/useTheme";

const FavTrip = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const trips = useAppSelector((state) => selectFavoriteTrips(state.trips));
  console.log({ trips: trips.length });
  if (trips.length === 0) {
    return (
      <>
        <Header
          leftIcon="arrow-back"
          title="Favourite Trips"
          onLeftIconPress={() => router.back()}
        />
        <View style={styles.container}>
          <Text style={styles.noTripsText}>You Do Not Like Our Trips Yet</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Header
        leftIcon="arrow-back"
        title="Favourite Trips"
        onLeftIconPress={() => router.back()}
      />

      <ScreenWraper>
        <View style={styles.container}>
          <FlatList
            data={trips}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <View key={item.trip_id}>
                  <Card
                    id={item.trip_id as string}
                    image={item.images[1]?.image_url || "default_image_uri"}
                    title={item.name}
                    subtitle={"Egypt"}
                    rating={null}
                    price={item.price}
                  />
                </View>
                {/* <Card
                id={item.tripDetailes.id}
                image={{ uri: item.tripDetailes.image }}
                title={item.tripDetailes.name}
                subtitle={item.tripDetailes.location}
                rating={item.tripDetailes.rating}
              /> */}
              </View>
            )}
            keyExtractor={(item) => item.trip_id as string}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.scrollContainer}
          />
        </View>
      </ScreenWraper>
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
      // marginBottom: 80,
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

export default FavTrip;
