/* eslint-disable prettier/prettier */
import { View, Text, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import Header from "@/components/core/Header";
import { trips } from "@/DummyData/trips.json";
import Card from "@/components/Card";
import { COLORS, SPACING } from "@/constants/theme";

const FavTrip = () => {
  // Uncomment the next line to mock the trips data as empty for testing
  const trips = []; 

  if (trips.length === 0) {
    return (
      <>
        <Header title="Favorite Trips" />
        <View style={styles.container}>
          <Text style={styles.noTripsText}>You Do Not like our Trips Yet :(</Text>
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
                id={item.id} 
                image={{ uri: item.image }} 
                title={item.title} 
                subtitle={item.location} 
                rating={item.rating} 
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
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
    width: Dimensions.get('screen').width * 0.44, 
  },
  columnWrapper: {
    justifyContent: "space-between", 
    marginBottom:10
  },
  scrollContainer: {
    paddingBottom: SPACING.large,
  },
});

export default FavTrip;
