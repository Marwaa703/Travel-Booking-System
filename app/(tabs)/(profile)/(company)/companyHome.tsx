/* eslint-disable prettier/prettier */
import { ScrollView, Text, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Buttons";
import Header from "@/components/core/Header";
import Card from "@/components/Card";
import Padding from "@/components/containers/Padding";
import Spacer from "@/components/Spacer";
import { FONTS } from "@/constants/theme";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { fetchTripsByCompanyId } from "@/redux/actions/tripActions";
import { RootState } from "@/redux/store";

// todo: pass the companyId coming from currentCompanyUser (Company Representative)
// todo: handle edit, delete trip here
const CompanyHome = () => {
  const route = useRoute();
  const { companyId } = route.params as { companyId: string };
  console.log(companyId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (companyId) {
      fetchTripsByCompanyId(companyId);
    }
  }, [companyId, dispatch]);

  const { trips, isLoading: loading } = useSelector((state: RootState) => state.trips);
  return (
    <View style={styles.container}>
      <Header title="Home Page" />
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

        <ScrollView>
          <View>
            <Text style={styles.sectionTitle}>Current trips</Text>
          </View>
          <Spacer />

          {loading ? (
            <Text>Loading trips...</Text>
          ) : trips.length === 0 ? (
            <Text>No trips to display. Add one!</Text>
          ) : (
            <View style={styles.cardContainer}>
              {trips.map((trip) => (
                <View key={trip.id} style={styles.cardWrapper}>
                  <Card
                    id={trip.id as string} 
                    image={trip.image ? trip.image.uri : 'default_image_uri'}
                    title={trip.name}
                    subtitle={trip.name} 
                    rating={0}
                    price={`$${trip.price}`}
                  />
                </View>
              ))}
            </View>
          )}
        </ScrollView>
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
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 20,
  },
});

export default CompanyHome;
