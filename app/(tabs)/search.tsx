import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { trips } from "@/DummyData/trips.json";
import Card from "@/components/Card";
import Header from "@/components/core/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, SPACING } from "@/constants/theme";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Header title={"Search"} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for trip places..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <Ionicons
            name="search"
            size={24}
            color={COLORS.primary}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {searchQuery === "" ? (
        <View style={styles.iconContainer}>
          <Text style={styles.searchText}>Search For Places Here</Text>
          <Ionicons name="search" size={70} color={COLORS.secondary} />
        </View>
      ) : filteredTrips.length === 0 ? (
        <View style={styles.iconContainer}>
          <Text style={styles.notFoundText}>No trips found</Text>
          <Ionicons name="search" size={70} color={COLORS.secondary} />
        </View>
      ) : (
        <FlatList
          key={searchQuery === "" ? "single-column" : "two-columns"}
          data={filteredTrips}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Card
                id={item.id}
                image={{ uri: item.image }}
                title={item.title}
                subtitle={item.location}
                rating={item.rating}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
