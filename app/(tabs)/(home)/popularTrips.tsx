import React, { Fragment, useEffect } from "react";
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
import { RootState, useAppSelector } from "@/redux/store";
import Spacer from "@/components/Spacer";
import { formattedDate } from "@/utils";

const PopularTrips: React.FC = () => {
  const dispatch = useDispatch();
  const trips = useAppSelector((state) => state.trips.trips);
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
            console.log(tripImages);
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
