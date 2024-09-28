/* eslint-disable prettier/prettier */

import Button from '@/components/Buttons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image
        source={{ uri: 'https://img.freepik.com/premium-photo/image-beautiful-place-world_952161-62132.jpg' }}
        style={styles.topImage}
        resizeMode="cover"
      />

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          It's a big world out there, go <Text style={styles.exploreText}>explore</Text>
        </Text>
        <Text style={styles.subtitle}>
          To get the best of your adventure, you just need to leave and go where you like. We are waiting for you.
        </Text>
      </View>

      {/* Button positioned at the bottom */}
      <View style={styles.buttonContainer}>
        <Button
          type='primary'
          title='Get Started'
          width={"90%"}
          onPress={() => {router.push("/login")}}
          align='center'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topImage: {
    width: '100%',
    height: height * 0.7,
  },
  textContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    marginTop: -30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:30
  },
  exploreText: {
    color: '#FF6F3D',
  },
  subtitle: {
    fontSize: 16,
    color: '#7a7a7a',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: '100%',
  },
});

export default ExploreScreen;
