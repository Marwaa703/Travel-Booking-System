/* eslint-disable prettier/prettier */
import { ScrollView, Text, View, StyleSheet } from "react-native";
import React from "react";

import Button from "@/components/Buttons";
import { router } from "expo-router";
import Header from "@/components/core/Header";
import Card from "@/components/Card";
import { companies } from "@/DummyData/companies.json";
import Padding from "@/components/containers/Padding";
import Spacer from "@/components/Spacer";
import { FONTS } from "@/constants/theme";

const CompanyHome = () => {
  return (
    <View style={styles.container}>
      <Header title="Home Page" />
   <Padding>
      <View style={styles.addButtonContainer}>
        <View style={styles.addButtonWrapper}>
          <Button title="Add new trip" onPress={() => { router.push("/addTrip"); }} />
        </View>
      </View>
      <ScrollView>
      <View>
        <Text style={styles.sectionTitle}>Current trips</Text>
      </View>
      <Spacer></Spacer>
        <View style={styles.cardContainer}>
          {companies.map((company, index) => (
            <View key={index} style={styles.cardWrapper}>
              <Card
                image={company.image}
                title={company.title}
                subtitle={company.subtitle}
                rating={company.rating}
                price="$150"
              />
            </View>
          ))}
        </View>
      </ScrollView>
      </Padding>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
