/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const Map = () => {
  const route = useRoute(); 
  const { tripId } = route.params as { tripId: string };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Map</Text>
     
      <Text style={styles.tripIdText}>Trip ID: {tripId}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tripIdText: {
    fontSize: 18,
    color: "#555",
  },
});

export default Map;
