/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import React from "react";
import { router } from "expo-router";
import Header from "@/components/core/Header";
import { COLORS, SPACING } from "@/constants/theme";
import Card from "@/components/Card";
import { companies } from "@/DummyData/companies.json";
import { trips, avatars } from "@/DummyData/trips.json";
import Button from "@/components/Buttons";
import Spacer from "@/components/Spacer";


const Home = () => {
  const avatarImages = avatars.map(avatar => ({
    id: avatar.id,
    uri: avatar.uri,
  }));
  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 70 }}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Explore the Beautiful</Text>
        <Text style={styles.span}>World!</Text>
        <Image source={require('../../../assets/Vector.png')} style={styles.image} />

        <View style={styles.trips}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Best Trips</Text>
            <Text style={styles.viewAll} onPress={() => router.push("/popularTrips")}>View All</Text>
          </View>

          {/* Horizontal ScrollView for Trip Profile Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {trips.map((trip, index) => (
              <View style={{marginRight:SPACING.small + 2,width:Dimensions.get('screen').width *0.45}} key={index}>
                <Card image={{ uri: trip.image }} title={trip.title} subtitle="kk" rating={trip.rating}></Card>
              </View>
            ))}
          </ScrollView>
        </View>

          <Spacer />
        <View style={styles.company}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Popular Companies</Text>
            <Text style={styles.viewAll} onPress={() => router.push("/popularCompanies")}>View All</Text>
          </View>
          <Spacer />
          <View style={styles.cardContainer}>
            {companies.map((company, index) => (
              <View key={index} style={styles.companyCardWrapper}>
                <Card
                  image={company.image}
                  title={company.title}
                  subtitle={company.subtitle}
                  rating={company.rating}
                  buttonText={company.buttonText}
                />
              </View>
            ))}
          </View>
          <Spacer height={SPACING.large}/>

          <Button title={"GO TO TRIP DETAILS"} onPress={()=>{router.push("/tripDetails")}}/>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  span: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  image: {
    width: 95,
    marginBottom: 20,
    marginLeft: 40,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    // paddingTop: 15,
    flex: 1,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    rowGap:14,
    columnGap:5


  },
  companyCardWrapper: {
    width: '48%',
  },
  horizontalScroll: {
    marginVertical: 15,
    overflow:'visible',
    columnGap:15,
  },

});

export default Home;
