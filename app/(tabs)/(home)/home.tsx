import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import Header from "@/components/core/Header";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import Card from "@/components/Card";
import { trips, avatars } from "@/DummyData/trips.json";
import Spacer from "@/components/Spacer";
import { useAppSelector } from "@/redux/store";
import { User } from "@/types/user";

const Home = () => {
  const popularCompanies = useAppSelector((state) => state.companies.companies);
  const { isError, isLoading, trips } = useAppSelector((state) => state.trips);
  const avatarImages = avatars.map((avatar) => ({
    id: avatar.id,
    uri: avatar.uri,
  }));
  useEffect(() => {
    // console.log({ trips: trips.length });
  }, [trips.length]);

  // const user = useAppSelector(
  //   (state) => state.auth.currentUser,
  // ) as unknown as User;

  // console.log(user?.role);

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 70 }}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Explore the Beautiful</Text>
        <Text style={styles.span}>World!</Text>
        <Image
          source={require("../../../assets/Vector.png")}
          style={styles.image}
        />

        <View style={styles.trips}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Best Trips</Text>
            <Text
              style={styles.viewAll}
              onPress={() => router.push("/popularTrips")}
            >
              View All
            </Text>
          </View>

          {/* Horizontal ScrollView for Trip Profile Cards */}
          {isLoading ? (
            <Text>Loading trips...</Text>
          ) : trips.length === 0 ? (
            <Text>No trips to display. Add one!</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {trips.map((trip) => (
                <View key={trip.trip_id} style={styles.cardWrapper}>
                  <Card
                    id={trip.trip_id as string}
                    image={trip.images[1]?.image_url || "default_image_uri"}
                    title={trip.name}
                    subtitle={trip.name}
                    rating={0}
                    price={`$${trip.price}`}
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        <Spacer />
        <View style={styles.company}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Popular Companies</Text>
            <Text
              style={styles.viewAll}
              onPress={() => router.push("/popularCompanies")}
            >
              View All
            </Text>
          </View>
          <Spacer />
          <View style={styles.cardContainer}>
            {popularCompanies &&
              popularCompanies.slice(0, 6).map((company, index) => (
                <View key={company.id} style={styles.companyCardWrapper}>
                  <Card
                    id={company.id as string}
                    image={company.logo as string}
                    title={company.name}
                    subtitle={company.address.slice(0, 20)}
                    rating={4}
                    buttonText={"Subscibe"}
                  />
                </View>
              ))}
          </View>
          <Spacer height={SPACING.large} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  span: {
    fontSize: 35,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  image: {
    width: 95,
    marginBottom: 20,
    marginLeft: 40,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    // paddingTop: 15,
    flex: 1,
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAll: {
    fontSize: 15,
    color: COLORS.secondary,
    // padding: 15,
  },
  trips: {},
  company: {
    // marginTop: 20,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: 14,
    columnGap: 5,
  },
  companyCardWrapper: {
    width: "48%",
  },
  horizontalScroll: {
    marginVertical: 15,
    overflow: "visible",
    columnGap: 15,
  },

  cardWrapper: {
    marginRight: SPACING.small + 2,
    width: Dimensions.get("screen").width * 0.45,
  },
});

export default Home;
