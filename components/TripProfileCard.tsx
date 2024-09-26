/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import Rating from './Rating';  // Assuming you have a Rating component
import { COLORS } from '@/constants/theme'; // Import your theme colors
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from 'react-native/Libraries/NewAppScreen';


interface TripProfileCardProps {
  image: ImageSourcePropType;
  title: string;
  date: string;
  rating: number;
  price: string;
  peopleJoined: number;
  avatars: ImageSourcePropType[]; // Array of avatar images
}

const TripProfileCard: React.FC<TripProfileCardProps> = ({ image, title, date, rating, price, peopleJoined, avatars }) => {
  return (
    <View style={styles.cardContainer}>

      {/* Image Section */}
      <Image source={image} style={styles.image} />

      {/* Text and Info Section */}
      <View style={styles.infoContainer}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Date */}
        <View style={styles.dateContainer}>
          <Ionicons name='calendar' style={styles.icon} color={COLORS.textSecondary}></Ionicons>
          <Text style={styles.dateText}>{date}</Text>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Rating rate={rating} ></Rating>
        </View>

        {/* People Joined */}
        <View style={styles.peopleContainer}>
          <View style={styles.avatarsContainer}>
            {avatars.map((avatar, index) => (
              <Image key={index} source={avatar} style={styles.avatar} />
            ))}
          </View>
          <Text style={styles.peopleText}>{peopleJoined} Person Joined</Text>
        </View>
      </View>

      {/* Price Tag */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>$ {price}</Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal:15,
    marginVertical: 10,
    elevation: 20, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
    marginTop:10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,

  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:10,
  },
  peopleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginRight: 15,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: -10, // Overlap avatars
  },
  peopleText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  priceContainer: {
    backgroundColor: COLORS.priceTag,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  priceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TripProfileCard;
