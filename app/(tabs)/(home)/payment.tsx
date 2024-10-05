/* eslint-disable prettier/prettier */
import { View, TextInput, Alert, StyleSheet, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import { trips } from "@/DummyData/trips.json";
import Button from '@/components/Buttons';
import { COLORS } from '@/constants/theme';



const Payment: React.FC = () => {
  const route = useRoute();
  const { tripId } = route.params as { tripId: string };
  const [userWalletAddress, setUserWalletAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [tripDetails, setTripDetails] = useState<any>(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {

         // const response = await axios.get(`http://localhost:3000/trips/${tripId}`); 
          // setTripPriceInWei(response.data.price); 
          
        const trip = trips.find(trip => trip.id === parseInt(tripId)); 
        if (trip) {
          setTripDetails(trip);
        } else {
          Alert.alert('Error', 'Trip not found');
        }
      } catch (error) {
        console.error('Error fetching trip details:', error);
        Alert.alert('Error', 'Could not fetch trip details');
      }
    };
    fetchTripDetails();
  }, [tripId]);

  const handlePayment = async () => {
    if (!userWalletAddress) {
      Alert.alert('Error', 'Please enter your wallet address');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.1.4:3000/payment', {
        companyId: 1, //!Will Change to be Dynamic  
        tripId,
        userWalletAddress,
        amountInWei: tripDetails.price
      });

      setLoading(false);

      if (response.status === 200) {
        Alert.alert('Payment Successful', 'Transaction hash: ' + response.data.transactionHash);

        const bookingResponse = await axios.post('http://localhost:3000/booked_trip', {
          tripId: tripId,
          userId: 1, //!Will Change to be Dynamic  
          transactionHash: response.data.transactionHash
        });

        if (bookingResponse.status === 201) {
          Alert.alert('Booking Successful', 'Your trip has been successfully booked!');
        } else {
          Alert.alert('Booking Failed', 'Could not book the trip. Please try again.');
        }
      } else {
        Alert.alert('Payment Failed', response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Payment error:', error);
      Alert.alert('Payment Error', 'Something went wrong during the payment.');
    }
  };

  if (!tripDetails) {
    return (
      <View >
        <ActivityIndicator size="large" color="#ff5b00" />
        <Text>Loading Trip Details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
   
    <View style={styles.logoContainer}>
      <Image source={require('../../../assets/eth_logo.png')} style={styles.ethLogo} />
    </View>
  
   <View style={styles.section}>
    <View style={styles.infoSection}>
      <View style={styles.tripDetailsColumn}>
        <Text style={styles.tripText}>Title: {tripDetails.title}</Text>
        <Text style={styles.tripText}>Date: {tripDetails.date}</Text>
        <Text style={styles.tripText}>Location: {tripDetails.location}</Text>
        <Text style={styles.tripText}>Rating: {tripDetails.rating}</Text>
        <Text style={styles.tripText}>People Joined: {tripDetails.peopleJoined}</Text>
        <Text style={styles.tripText}>Price: {tripDetails.price} Wei</Text>
      </View>
  
     
      <View style={styles.imageColumn}>
        <Image 
          source={{ uri: tripDetails.image }} 
          style={styles.tripImage} 
        />
      </View>
    </View>
  
    <View style={styles.inputSection}>
      <Text style={styles.label}>Enter your Wallet Address:</Text>
      <TextInput
        style={styles.input}
        value={userWalletAddress}
        onChangeText={setUserWalletAddress}
        placeholder="0x..."
        placeholderTextColor="#aaa"
      />
     
    </View>
    <Button 
        title={loading ? 'Processing...' : `Book Now`} 
        onPress={handlePayment} 
        align='center' 
        disabled={loading} 
        width={"100%"}
      />
    </View>
  </ScrollView>
  
  

  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ethLogo: {
    width: 200, 
    height: 200,
    resizeMode: 'contain',
  },
  section:{
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexGrow: 1,
    justifyContent: "space-between",
  },

  infoSection: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  tripDetailsColumn: {
    flex: 1, 
    paddingRight: 20, 
  },
  tripText: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  imageColumn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20, 
  },
  inputSection: {
    marginTop: 20,
    // alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderWidth: 2,
    width: '95%', 
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
});