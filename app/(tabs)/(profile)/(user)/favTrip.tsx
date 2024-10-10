import { View, Text, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "@/components/core/Header";
import Card from "@/components/Card";
import { COLORS, SPACING } from "@/constants/theme";
import { selectFavoriteTrips } from "@/redux/slices/tripsSlice";

const FavTrip = () => {
  const trips = useSelector(selectFavoriteTrips);

  if (trips.length === 0) {
    return (
      <>
        <Header title="Favorite Trips" />
        <View style={styles.container}>
          <Text style={styles.noTripsText}>
            You Do Not Like Our Trips Yet :(
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Header title="Favorite Trips" />
      <View style={styles.container}>
        <FlatList
          data={trips}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Card
                id={item.tripDetailes.id}
                image={{ uri: item.tripDetailes.image }}
                title={item.tripDetailes.name}
                subtitle={item.tripDetailes.location}
                rating={item.tripDetailes.rating}
              />
            </View>
          )}
          keyExtractor={(item) => item.tripDetailes.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.scrollContainer}
        />
      </View>
    </>
  );
};

// Styles for the component
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

export default FavTrip;
