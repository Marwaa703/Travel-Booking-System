/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Card from '@/components/Card';
import { companies } from "@/DummyData/companies.json";
import Padding from '@/components/containers/Padding';

const { width } = Dimensions.get('screen');
const CARD_WIDTH = width * 0.4; // Set the card width to be 45% of the screen width

const PopularCompanies = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={{marginBottom:70}}>
        <Padding>
      <View style={styles.gridContainer}>
        {companies.map((company, index) => (
          <View key={index} style={[styles.cardWrapper, { width: CARD_WIDTH }]}>
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
      </Padding>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center', // Center the content to make it look consistent across devices
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    marginBottom: 15,
    alignItems: 'center', // Center the card within its container
  },
});

export default PopularCompanies;
