/* eslint-disable react-native/no-unused-styles */
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Card from "@/components/Card";
import Header from "@/components/core/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorPalette, SPACING } from "@/constants/theme"; // Import ColorPalette
import { router } from "expo-router";
import { getLocationsByTripId } from "@/api/tripLocations";
import { getAllTrips } from "@/api/trip";
import { useAppSelector } from "@/redux/store";
import { useTheme } from "@/hooks/useTheme"; // Import useTheme

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trips, setTrips] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { trips: tripImgs } = useAppSelector((state) => state.trips);

  const theme = useTheme(); // Use theme for styles
  const styles = stylesObject(theme); // Define styles using theme

  useEffect(() => {
    const fetchTripsAndLocations = async () => {
      try {
        setLoading(true);
        const tripsData = await getAllTrips();
        setTrips(tripsData);
        const locationsData = await Promise.all(
          tripsData.map((trip) => getLocationsByTripId(trip?.id)),
        );
        setLocations(locationsData.flat());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripsAndLocations();
  }, []);

  const filteredTrips = trips.filter((trip) =>
    locations.some(
      (location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        location.trip_id === trip.id,
    ),
  );

  return (
    <View style={styles.container}>
      <Header
        title={"Search"}
        leftIcon=""
        onLeftIconPress={() => {}}
        rightIcon=""
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for trip locations..."
          value={searchQuery}
          placeholderTextColor={theme.textSecondary}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <Ionicons
            name="search"
            size={24}
            color={theme.primary}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.iconContainer}>
          <Text style={styles.searchText}>Loading trips...</Text>
        </View>
      ) : error ? (
        <View style={styles.iconContainer}>
          <Text style={styles.notFoundText}>Error: {error}</Text>
        </View>
      ) : searchQuery === "" ? (
        <View style={styles.iconContainer}>
          <Image
            source={require("@/assets/vectors/search.png")}
            style={styles.search}
          />
        </View>
      ) : filteredTrips.length === 0 ? (
        <View style={styles.iconContainer}>
          <Text style={styles.notFoundText}>
            No trips found with that location
          </Text>
          <Ionicons name="search" size={70} color={theme.secondary} />
        </View>
      ) : (
        <FlatList
          key={searchQuery === "" ? "single-column" : "two-columns"}
          data={filteredTrips}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={styles.columnWrapper}
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
        />
      )}
    </View>
  );
};

const stylesObject = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.bg,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: COLORS.primary,
      borderWidth: 1,
      borderRadius: 15,
      margin: 20,
      paddingHorizontal: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
    },
    searchIcon: {
      marginLeft: 10,
    },
    search: {
      objectFit: "contain",
      width: "80%",
    },
    iconContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    searchText: {
      fontSize: 16,
      color: COLORS.secondary,
      marginBottom: 10,
    },
    notFoundText: {
      fontSize: 16,
      color: COLORS.secondary,
    },
    cardContainer: {
      flex: 1,
      margin: SPACING.small,
      width: Dimensions.get("screen").width * 0.45,
    },
    columnWrapper: {
      justifyContent: "space-between",
    },
  });

export default Search;
