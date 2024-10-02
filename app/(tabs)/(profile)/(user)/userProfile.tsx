/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import SettingCard from '@/components/SettingContainer'; 
import { COLORS } from '@/constants/theme';
import Header from '@/components/core/Header';
import { router } from 'expo-router';

const ProfileScreen: React.FC = () => {
  return (
    <>
      <Header 
        title='User Profile' 
        rightIcon='create-outline' 
        leftIcon='arrow-back' 
        onRightIconPress={() => { router.push("/userEdit"); }} 
        // todo :not working
        onLeftIconPress={() => { router.push('/userProfile'); }} 
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.container}>
          <View>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg" }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>Leonardo</Text>
              <Text style={styles.profileEmail}>leonardo@gmail.com</Text>
            </View>

            {/* Setting Cards */}
            {/* <SettingCard
              title="Profile"
              onPress={() => {}}
              leftIconName="person"
            /> */}
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
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20, 
    marginBottom: 100, 
  },
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.opacity, 
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
