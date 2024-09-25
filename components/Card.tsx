/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import Like from "@/components/Like";
import Buttons from '@/components/Buttons'; // Import your Button component
import CardSubtitle from './CardSubtitle';
import icons from "@/constants/icons";
import { COLORS } from '@/constants/theme';
import Rating from './Rating';

interface CardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  rating: number;
  price?: string; // Optional price prop
  buttonText?: string; // Optional button text
}

const Card: React.FC<CardProps> = ({ image, title, subtitle, rating, price, buttonText }) => {
  return (
    <View style={styles.cardContainer}>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>

      {/* Text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <CardSubtitle text={subtitle} icon={icons.location} iconColor={COLORS.textSecondary} />

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Rating rate={rating} />
        </View>

      </View>
        {/* Conditionally render price or button */}
        {price ? (
          <Text style={styles.priceText}>{price} / Person</Text>
        ) : buttonText ? (
          <Buttons type='secondary' title={buttonText} onPress={()=>{}} width={"60%"} align='flex-end'/>
        ) : null}

      {/* Like icon */}
      <View style={styles.iconContainer}>
        <Like />
      </View>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  cardContainer: {
    width: 220,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    margin: 10,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: 200, // You can adjust the height if needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%', // Adjust the width of the image
    height: '90%', // Adjust the height of the image
    alignSelf: 'center',
    borderRadius: 10,
  },
  textContainer: {
    padding: 10,

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10
  },
  priceText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: 'bold',
    marginBottom:10,
    marginHorizontal:10,
  },
  iconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 50,
    padding: 5,
  },
});

export default Card;
