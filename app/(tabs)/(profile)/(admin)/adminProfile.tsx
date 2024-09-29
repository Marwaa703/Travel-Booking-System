/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { COLORS, FONTS } from "@/constants/theme";
import Header from "@/components/Header";
import SettingCard from "@/components/SettingContainer";
import { router } from "expo-router";

const AdminProfile: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/7816/7816916.png" }}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.greetingText}>Hello, Admin</Text>

      <SettingCard
        title="Pending Requests"
        onPress={() => {router.push("pending")}}
        leftIconName="pending-actions"
      />
      <SettingCard
        title="Companies Approved"
        onPress={() => {router.push("approved")}}
        leftIconName="verified"
      />
      <SettingCard
        title="Trips Analysis"
        onPress={() => { router.push("tripAnalysis")}}
        leftIconName="bar-chart"
      />
      <SettingCard
        title="Register Users"
        onPress={() => {router.push("registerUser")}}
        leftIconName="person-add"
      />
    </ScrollView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  profileImage: {
    width: 120, 
    height: 120,
    borderRadius: 60, 
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  greetingText: {
    color: COLORS.primary,
    textAlign: "center",
    fontSize: FONTS.xlarge,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
