/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Card from '@/components/Card';


const companiesData = [
  {
    image: { uri: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?cs=srgb&dl=pexels-pixabay-269077.jpg&fm=jpg" },
    title: "Techify Inc",
    subtitle: "Silicon Valley, USA",
    rating: 4.8,
    buttonText: "Subscribe"
  },
  {
    image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoDCoqKVTF_iUmibmIivrKeHCJTBnhPjG6Zw&s" },
    title: "Finsoft Solutions",
    subtitle: "Berlin, Germany",
    rating: 4.7,
    buttonText: "Subscribe"
  },
  {
    image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTkt-440gMxjkJiEfMMLgshvwi0rYF0efhCA&s" },
    title: "InnovaTech",
    subtitle: "Tokyo, Japan",
    rating: 4.9,
    buttonText: "Subscribe"
  },
  {
    image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjH4mkCsN92-376DR264NV3nlb6LnZEdbY4A&s" },
    title: "GreenEnergy Corp",
    subtitle: "Oslo, Norway",
    rating: 4.6,
    buttonText: "Subscribe"
  },
  {
    image: { uri: "https://i.insider.com/51643ba7eab8ea0538000003?width=800&format=jpeg&auto=webp" },
    title: "BioPharma Ltd",
    subtitle: "Basel, Switzerland",
    rating: 4.5,
    buttonText: "Subscribe"
  },
  {
    image: { uri: "https://cdn.archilovers.com/projects/c_383_6a060802-4e1c-4f49-9fbc-826d0d83d08d.jpg" },
    title: "AutoMech",
    subtitle: "Detroit, USA",
    rating: 4.3,
    buttonText: "Subscribe"
  },
];

const PopularCompanies = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={{marginBottom:100}}>

      <View style={styles.gridContainer}>
        {companiesData.map((company, index) => (
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