import React, { Fragment } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { fetchTrips } from "@/redux/actions/tripActions";
import TripProfileCard from "@/components/TripProfileCard";
import { RootState, useAppSelector } from "@/redux/store";
import Spacer from "@/components/Spacer";
import { formattedDate } from "@/utils";
import useRefreshControl from "@/hooks/useRefreshControl";

const PopularTrips: React.FC = () => {
  const dispatch = useDispatch();
  const trips = useAppSelector((state: RootState) => state.trips.trips);

  //^how to use the useRefreshControl Hook (3 steps)
  // ^STEP ONE: Define the function that will be called to refresh data.
  // ^This is where you define what should happen when the user pulls to refresh.
  const onRefresh = async () => {
    await dispatch(fetchTrips());
  };

  // ^STEP TWO: Pass the onRefresh function to the useRefreshControl hook.
  // ^The hook returns the refreshControl object, which manages the refreshing state.
  const { refreshControl } = useRefreshControl({ onRefresh });

  return (
    <View style={styles.container}>
      {trips.length === 0 ? (
        <Text>No trips available</Text>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.trip_id}
          renderItem={({ item }) => {
            const tripImages = item.images.filter(
              (image) => image.trip_id === item.trip_id,
            );
            return (
              <Fragment key={item.trip_id}>
                <TripProfileCard
                  id={item.trip_id as string}
                  image={
                    tripImages.length > 0
                      ? (tripImages[0].image_url as string)
                      : null
                  }
                  title={item.name}
                  date={formattedDate(item.date)}
                  rating={0}
                  price={item.price}
                  peopleJoined={item.max_reservations}
                  avatars={[]}
                  caller={"Home"}
                />
                <Spacer />
              </Fragment>
            );
          }}
          // ^STEP THREE: Add the refreshControl prop to the FlatList component.
          // ^This ensures that when the user pulls down, the refreshing action triggers the onRefresh function defined earlier.
          refreshControl={<RefreshControl {...refreshControl} />}
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
});

export default PopularTrips;
