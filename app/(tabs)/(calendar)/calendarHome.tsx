import { Text, View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import Header from "@/components/core/Header";
import { COLORS, FONTS } from "@/constants/theme";
import Spacer from "@/components/Spacer";
import TripProfileCard from "@/components/TripProfileCard";
import Padding from "@/components/containers/Padding";
import WeeklyCalendar from "@/components/Calendar";
import { getBookedTripsByUserId } from "@/api/bookedTrips";
import { RootState, useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { getTripById } from "@/api/trips/trip";
import moment from "moment";
import FormatDate from "@/components/core/FormatDate";
import { setError } from "@/redux/slices/companiesSlice";
import { User } from "@/types/user";

const Calendar = () => {
  const user = useAppSelector(
    (state) => state.auth.currentUser,
  ) as unknown as User;
  const [bookedTrips, setBookedTrips] = useState([]);
  const [tripDetails, setTripDetails] = useState([]);
  const userId = user?.id;

  useEffect(() => {
    const fetchBookedTrips = async () => {
      try {
        const trips = await getBookedTripsByUserId(userId);
        setBookedTrips(trips);
        const tripsWithDetails = await Promise.all(
          trips.map(async (booking) => {
            const trip = await getTripById(booking.trip_id);
            return trip;
          }),
        );

        setTripDetails(tripsWithDetails);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookedTrips();
  }, [userId]);
  // Extract start dates of the trips
  const tripStartDates = tripDetails.map(
    (trip) => moment(trip.date).format("YYYY-MM-DD") || [],
  );
  return (
    <View style={styles.container}>
      <Header
        title="Schedule"
        leftIcon="chevron-back"
        onLeftIconPress={() => router.push("home")}
      ></Header>
      <View style={styles.calendar}>
        <WeeklyCalendar tripStartDates={tripStartDates} />
      </View>
      <Spacer />
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>My Schedule</Text>
        <Text style={styles.viewAll} onPress={() => {}}>
          View All
        </Text>
      </View>

      <Spacer />
      <ScrollView>
        <Padding>
          <View style={{ marginTop: 10 }}>
            {tripDetails.length === 0 ? (
              <Text style={styles.noTripsText}>No trips booked yet.</Text>
            ) : (
              tripDetails.map((trip, index) => (
                <View key={index} style={styles.cardWrapper}>
                  <TripProfileCard
                    id={trip.id}
                    image={trip.image_url}
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
              ))
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
    marginBottom: 100,
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
