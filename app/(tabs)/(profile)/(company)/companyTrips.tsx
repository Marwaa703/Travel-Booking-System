import { ScrollView, Text, View, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import Button from "@/components/Buttons";
import Header from "@/components/core/Header";
import Padding from "@/components/containers/Padding";
import Spacer from "@/components/Spacer";
import { COLORS, FONTS } from "@/constants/theme";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { router } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchTrips } from "@/redux/actions/tripActions";
import TripManagementCard from "@/components/company/TripManagementCard";
import { Trip, TripStatus } from "@/types/trip";
import Toast from "react-native-toast-message";

const CompanyHome = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { companyId } = route.params as { companyId: string };

  const { isLoading, trips: alltrips } = useAppSelector((state) => state.trips);

  // Fetch trips when the screen is focused
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTrips(companyId));
    }, [companyId]),
  );

  // Display success toast when a new trip is added
  useEffect(() => {
    if (route.params?.addTrip) {
      Toast.show({
        text1: "Trip Added",
        text2: "Your new trip has been added successfully!",
        position: "top",
      });
    }
  }, [route.params?.addTrip]);

  // Filter trips by companyId and sort them
  const trips = alltrips
    .filter((t) => t.company_id == companyId)
    .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));

  return (
    <View style={styles.container}>
      <Header
        title="Trips"
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
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
        <Text style={styles.sectionTitle}>Current trips</Text>
        {isLoading ? (
          <Text>Loading trips...</Text>
        ) : trips.length === 0 ? (
          <Text>No trips to display. Add one!</Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Spacer />
            <View style={styles.cardContainer}>
              {trips.map((trip) => (
                <View key={trip.trip_id} style={styles.cardWrapper}>
                  <TripManagementCard trip={trip} />
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
    backgroundColor: COLORS.bg,
    marginBottom: 90,
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonWrapper: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: FONTS.large,
  },
  cardWrapper: {
    width: "100%",
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default CompanyHome;
