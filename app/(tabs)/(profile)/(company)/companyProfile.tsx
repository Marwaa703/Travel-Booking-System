/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import SettingCard from '@/components/SettingContainer'; 
import { COLORS } from '@/constants/theme';
import Header from '@/components/core/Header';
import { router } from 'expo-router';

const CompanyProfile: React.FC = () => {
  return (
    <>
      <Header 
        title='Company Profile' 
        rightIcon='create-outline' 
        leftIcon='arrow-back' 
        onRightIconPress={() => {  }} 
        onLeftIconPress={() => { router.back(); }} 
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.container}>
          <View>
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: "https://example.com/company-logo.png" }} 
                style={styles.companyLogo}
              />
              <Text style={styles.companyName}>Company</Text>
              <Text style={styles.companyEmail}>contact@company.com</Text>
            </View>

            <SettingCard
              title="Company Profile"
              onPress={() => {}}
              leftIconName="business"
            />
              <SettingCard
              title="Trips"
              onPress={() => {router.push("companyHome")}}
              leftIconName="air"
            />
            <SettingCard
              title="Manage Employees"
              onPress={() => {}}
              leftIconName="people"
            />
            <SettingCard
              title="Company Settings"
              onPress={() => {}}
              leftIconName="settings"
            />
            <SettingCard
              title="Other Settings"
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
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.opacity, 
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: COLORS.textPrimary,
  },
  companyEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default CompanyProfile;
