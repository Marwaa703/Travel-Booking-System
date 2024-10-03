/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import Like from "@/components/Like";
import Buttons from '@/components/Buttons';
import CardSubtitle from './CardSubtitle';
import icons from "@/constants/icons";
import { COLORS, FONTS } from '@/constants/theme';
import Rating from './Rating';
import Spacer from './Spacer';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.44;
const CARD_HEIGHT = CARD_WIDTH * 1.68;

interface CardProps {
  id: number;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  rating: number;
  price?: string; // Optional price prop
  buttonText?: string; // Optional button text
}

const Card: React.FC<CardProps> = ({ id, image, title, subtitle, rating, price, buttonText }) => {
  const navigation = useNavigation<NavigationProp<any>>(); 

  const handlePress = () => {
    if(!buttonText){
    navigation.navigate('tripDetails', { tripId: id }); 
  };
};
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}> 

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
      {/* todo:  */}
      <Spacer />
      {price ? (
        <Text style={styles.priceText}>{price} / Person</Text>
      ) : buttonText ? (
        <Buttons type='secondary' title={buttonText} onPress={() => {}} width={"60%"} align='flex-end'/>
      ) : null}

      {/* Like icon */}
      <View style={styles.iconContainer}>
        <Like />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    position: 'relative',
    padding: 10,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '100%',
    height: '50%', // Adjust the height of the image container to keep the aspect ratio consistent
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  textContainer: {
    paddingTop: 8,
  },
  title: {
    fontSize: FONTS.normal,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  priceText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 50,
  },
});

export default Card;