import { ScrollView, Text, View, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import Button from "@/components/Buttons";
import Header from "@/components/core/Header";
import Padding from "@/components/containers/Padding";
import Spacer from "@/components/Spacer";
import { FONTS } from "@/constants/theme";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { router } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  deleteFullTrip,
  fetchTrips,
  updateTripStatus,
} from "@/redux/actions/tripActions";
import TripManagementCard from "@/components/company/TripManagementCard";
import { TripDetailes, TripStatus } from "@/types/trip";

// todo: handle edit, delete trip here
const CompanyHome = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { companyId } = route.params as { companyId: string };

  const { isLoading, trips: alltrips } = useAppSelector((state) => state.trips);

  //fix:  companyId type is diff
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTrips(companyId));
    }, [companyId, dispatch]),
  );
  // useEffect(() => {
  //   if (route.params?.addTrip) {
  //     console.log("new trip has been added and now we will check this");
  //     Toast.show({
  //       text1: "TripAdded",
  //       text2: "Your new trip has been added successfully!",
  //     });
  //   }
  // }, [route.params?.addTrip]);

  const trips = alltrips
    .filter((t) => {
      console.log(typeof t.company_id, typeof companyId);
      return t.company_id == companyId;
    })
    .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
  console.log({ allTrips: alltrips.length, trips: trips.length });
  console.log(trips);

  const handleDeleteTrip = (id: string) => {
    console.log(id);
    dispatch(deleteFullTrip(id));
    if (!isLoading) console.log("done");
  };
  const handleChangeStatus = (trip: TripDetailes) => {
    console.log(trip.trip_id);
    const updated: Partial<TripDetailes> = {
      status: "active",
    };
    dispatch(updateTripStatus(trip.trip_id as string, updated));
    console.log("done", isLoading);
  };

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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Current trips</Text>
            <Spacer />
            <View style={styles.cardContainer}>
              {trips.map((trip) => (
                <View key={trip.trip_id} style={styles.cardWrapper}>
                  <TripManagementCard
                    id={trip.trip_id as string}
                    image={trip.images[0]?.image_url || "default_image_uri"}
                    title={trip.name}
                    rating={trip.rate ?? null}
                    price={trip.price}
                    status={trip.status as TripStatus}
                    handleEdit={(id) => console.log({ edittrip: id })}
                    handleDelete={() =>
                      handleDeleteTrip(trip.trip_id as string)
                    }
                    handleChangeStatus={() => handleChangeStatus(trip)}
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
    width: "100%",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default CompanyHome;
