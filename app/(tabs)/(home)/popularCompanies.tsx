import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Card from "@/components/Card";
import Padding from "@/components/containers/Padding";
import { useAppSelector } from "@/redux/store";
import Header from "@/components/core/Header";

const PopularCompanies = () => {
  const popularCompanies = useAppSelector((state) => state.companies.companies);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={{ marginBottom: 70 }}
    >
      <Padding>
        <View style={styles.gridContainer}>
          {popularCompanies &&
            popularCompanies.map((company, index) => (
              <View key={index} style={[styles.cardWrapper, { width: "48%" }]}>
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
      </Padding>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center", // Center the content to make it look consistent across devices
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    marginBottom: 15,
    alignItems: "center", // Center the card within its container
  },
});

export default PopularCompanies;
