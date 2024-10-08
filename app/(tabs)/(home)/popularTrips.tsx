import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "@/redux/actions/tripActions";
import { fetchImagesByTripId } from "@/redux/actions/imageActions";
import { COLORS } from "@/constants/theme";
import TripProfileCard from "@/components/TripProfileCard";
import { RootState } from "@/redux/store";

const PopularTrips: React.FC = () => {
  const dispatch = useDispatch();

  const {
    trips,
    isLoading: loading,
    isError: error,
  } = useSelector((state: RootState) => state.trips);
  const {
    images = [],
    loading: imageLoading,
    error: imageError,
  } = useSelector((state: RootState) => state.images) || {};

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  useEffect(() => {
    trips.forEach((trip) => {
      dispatch(fetchImagesByTripId(trip.id));
    });
  }, [trips, dispatch]);
  // if (loading || imageLoading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color={COLORS.primary} />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text>Error fetching trips</Text>
  //     </View>
  //   );
  // }

  // if (imageError) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text>Error fetching images</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {trips.length === 0 ? (
        <Text>No trips available</Text>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const tripImages = images.filter(
              (image) => image.trip_id === item.id,
            );
            const formattedDate = new Date(item.date).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            );

            return (
              <TripProfileCard
                id={item.id}
                image={tripImages.length > 0 ? tripImages[0].image_url : null}
                title={item.name}
                date={formattedDate}
                rating={item.rate}
                price={item.price}
                peopleJoined={item.max_reservations}
                avatars={[]}
                caller={"Home"}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  // loadingContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // errorContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

export default PopularTrips;
