import { ScrollView, Text, View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/Buttons";
import Header from "@/components/core/Header";
import Card from "@/components/Card";
import Padding from "@/components/containers/Padding";
import Spacer from "@/components/Spacer";
import { FONTS } from "@/constants/theme";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { router } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchTrips } from "@/redux/actions/tripActions";
import Toast from "react-native-toast-message"; // For displaying notifications

// todo: handle edit, delete trip here
const CompanyHome = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { companyId } = route.params as { companyId: string };

  const {
    isError,
    isLoading,
    trips: alltrips,
  } = useAppSelector((state) => state.trips);

  //fix:  companyId type is diff
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTrips(companyId));
    }, [companyId, dispatch]),
  );
  useEffect(() => {
    if (route.params?.addTrip) {
      Toast.show({
        text1: "TripAdded",
        text2: "Your new trip has been added successfully!",
      });
    }
  }, [route.params?.addTrip]);

  const trips = alltrips
    .filter((t) => {
      console.log(typeof t.company_id, typeof companyId);
      return t.company_id == companyId;
    })
    .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
  console.log({ allTrips: alltrips.length, trips: trips.length });
  console.log(trips);
  return (
    <View style={styles.container}>
      <Header title="Trips" />
      <Padding>
        <View style={styles.addButtonContainer}>
          <View style={styles.addButtonWrapper}>
            <Button
              title="Add new trip"
              onPress={() => {
                router.push(`/addTrip/?companyId=${companyId}`);
              }}
            />
          </View>
        </View>

        {isLoading ? (
          <Text>Loading trips...</Text>
        ) : trips.length === 0 ? (
          <Text>No trips to display. Add one!</Text>
        ) : (
          <ScrollView>
            <Text style={styles.sectionTitle}>Current trips</Text>
            <Spacer />
            <View style={styles.cardContainer}>
              {trips.map((trip) => (
                <View key={trip.trip_id} style={styles.cardWrapper}>
                  <Card
                    id={trip.trip_id as string}
                    image={trip.images[0]?.image_url || "default_image_uri"}
                    title={trip.name}
                    subtitle={trip.name}
                    rating={0}
                    price={`$${trip.price}`}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </Padding>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 90,
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  addButtonWrapper: {
    width: "70%",
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: "bold",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default CompanyHome;
