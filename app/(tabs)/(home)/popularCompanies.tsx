/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Card from '@/components/Card';
import{companies} from "@/DummyData/companies.json"



const PopularCompanies = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={{marginBottom:100}}>

      <View style={styles.gridContainer}>
      {companies.map((company, index) => (
            <View key={index} style={styles.cardWrapper}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width:Dimensions.get('window').width,
    paddingHorizontal: 5,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '50%', 
    marginBottom: 5,
  },
});

export default PopularCompanies;