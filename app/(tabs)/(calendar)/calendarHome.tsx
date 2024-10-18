import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import Header from "@/components/core/Header";
import { COLORS, FONTS } from "@/constants/theme";
import Spacer from "@/components/Spacer";
import TripProfileCard from "@/components/TripProfileCard";
import Padding from "@/components/containers/Padding";
import WeeklyCalendar from "@/components/Calendar";
import { getBookedTripsByUserId } from "@/api/bookedTrips";
import { useAppSelector } from "@/redux/store";
import { getTripById } from "@/api/trips/trip";
import moment from "moment";
import FormatDate from "@/components/core/FormatDate";
import { setError } from "@/redux/slices/companiesSlice";
import { User } from "@/types/user";
import { useDispatch } from "react-redux";
import { setBookedTrips } from "@/redux/slices/bookedTripSlice";
import useRefreshControl from "@/hooks/useRefreshControl";

const Calendar = () => {
  const user = useAppSelector(
    (state) => state.auth.currentUser,
  ) as unknown as User;
  const [tripDetails, setTripDetails] = useState([]);
  const userId = user?.id;
  const dispatch = useDispatch();
  const { trips: tripImgs } = useAppSelector((state) => state.trips);

  const fetchBookedTrips = useCallback(async () => {
    try {
      const trips = await getBookedTripsByUserId(userId!);
      dispatch(setBookedTrips(trips));
      const tripsWithDetails = await Promise.all(
        trips.map(async (booking: { trip_id: string }) => {
          const trip = await getTripById(booking.trip_id);
          return { ...trip };
        }),
      );

      const activeTrips = tripsWithDetails.filter(
        (trip) => trip.status !== "completed",
      );

      setTripDetails(activeTrips);
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      fetchBookedTrips();
    }
  }, [userId, fetchBookedTrips]);

  const tripStartDates = useMemo(() => {
    return tripDetails.map((trip) => moment(trip.date).format("YYYY-MM-DD"));
  }, [tripDetails]);

  const { refreshControl } = useRefreshControl({
    onRefresh: fetchBookedTrips,
  });

  return (
    <View style={styles.container}>
      <Header title="Schedule" leftIcon="" onLeftIconPress={() => {}} />
      <View style={styles.calendar}>
        <WeeklyCalendar tripStartDates={tripStartDates} />
      </View>
      <Spacer />
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>My Schedule</Text>
        {/* <Text style={styles.viewAll} onPress={() => {}}>
          View All
        </Text> */}
      </View>
      <Spacer />
      <ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
        <Padding>
          <View style={{ marginTop: 10 }}>
            {tripDetails.length === 0 ? (
              <Text style={styles.noTripsText}>No trips booked yet.</Text>
            ) : (
              tripDetails.map((trip, index) => {
                const tripWithImages = tripImgs.find(
                  (t) => t.trip_id === trip.id,
                );

                const firstImageUrl =
                  tripWithImages && tripWithImages.images.length > 0
                    ? tripWithImages.images[0].image_url
                    : null;
                return (
                  <View key={index} style={styles.cardWrapper}>
                    <TripProfileCard
                      id={trip.id}
                      image={firstImageUrl}
                      title={trip.name}
                      date={<FormatDate dateString={trip.date} />}
                      rating={4}
                      price={trip.price}
                      avatars={[
                        {
                          uri: "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
                        },
                        {
                          uri: "https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg",
                        },
                        {
                          uri: "https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
                        },
                      ]}
                      peopleJoined={4}
                      caller="calendar"
                    />
                  </View>
                );
              })
            )}
          </View>
        </Padding>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    marginBottom: 80,
  },
  calendar: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 25,
  },
  subtitle: {
    fontSize: FONTS.large,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    flex: 1,
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  viewAll: {
    fontSize: FONTS.normal,
    color: COLORS.secondary,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  noTripsText: {
    textAlign: "center",
    fontSize: FONTS.normal,
    color: COLORS.textSecondary,
    marginVertical: 20,
  },
});

export default Calendar;
