/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Button } from 'react-native';
import SettingCard from '@/components/SettingContainer'; // Assuming the file path is correct
import { COLORS } from '@/constants/theme';
import Header from '@/components/Header';
import { router } from 'expo-router';

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header></Header> */}

    <View >
      {/* Profile Header */}

      <View style={styles.headerContainer}>
        <Image
          source={{uri:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"}}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Leonardo</Text>
        <Text style={styles.profileEmail}>leonardo@gmail.com</Text>
      </View>

      {/* Setting Cards */}
      <SettingCard
        title="Profile"
        onPress={() => {}}
        leftIconName="person"
      />
      <SettingCard
        title="Favorites"
        onPress={() => router.push("/favTrip")}
        leftIconName="favorite"
      />
      <SettingCard
        title="Previous Trips"
        onPress={() => router.push("/perviousTrip")}
        leftIconName="history"
      />
      <SettingCard
        title="Settings"
        onPress={() => {}}
        leftIconName="settings"
      />
      <SettingCard
        title="Other Setting"
        onPress={() => {}}
        leftIconName="tune"
      />
    </View>
    <Button
        onPress={() => {
          router.push("userEdit");
        }}
        title="Edit Profile"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,

  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 30,
    marginTop:100
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.opacity, // Placeholder color if no image
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: COLORS.textPrimary,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default ProfileScreen;
