import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "@/redux/actions/tripActions"; // Adjust the import based on your folder structure
import { RootState } from "@/redux/store"; // Import your RootState type

const TripsScreen = () => {
  const dispatch = useDispatch();
  const { trips, loading, error } = useSelector(
    (state: RootState) => state.trips,
  );

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching trips. Please try again later.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tripItem}>
            <Text style={styles.tripTitle}>{item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  tripItem: {
    marginBottom: 16,
    padding: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TripsScreen;
