/* eslint-disable react-native/no-unused-styles */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import SettingCard from "@/components/SettingContainer";
import { ColorPalette, COLORS } from "@/constants/theme";
import Header from "@/components/core/Header";
import { router } from "expo-router";
import useLogout from "@/hooks/useLogout";
import { useAppSelector } from "@/redux/store";
import { User } from "@/types/user";
import Spacer from "@/components/Spacer";
import { useTheme } from "@/hooks/useTheme";

const ProfileScreen: React.FC = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const auth = useAppSelector((state) => state.auth.currentUser);
  const user = useAppSelector(
    (state) => state.auth.currentUser,
  ) as unknown as User;
  const logout = useLogout();
  console.log({ auth });

  return (
    <>
      <Header
        title="User Profile"
        rightIcon="create-outline"
        onRightIconPress={() => {
          router.push("/userEdit");
        }}
        onLeftIconPress={() => {}}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Spacer height={16} />
        <SafeAreaView style={styles.container}>
          <View style={styles.cardlist}>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
              <Image
                source={{
                  uri: user?.profile_picture
                    ? user?.profile_picture
                    : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
                }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>
                {user?.first_name + " " + user?.last_name}
              </Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
            <Spacer height={24} />

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
            <Spacer height={16} />
            <SettingCard
              title="Previous Trips"
              onPress={() => router.push("/perviousTrip")}
              leftIconName="history"
            />
            <Spacer height={16} />

            <SettingCard
              title="Setting"
              onPress={() => {
                router.push("/(profile)/settings");
              }}
              leftIconName="tune"
            />
            <Spacer height={16} />
            <SettingCard
              title="Log Out"
              onPress={() => logout()}
              leftIconName="logout"
            />
            <Spacer height={16} />
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 0,
      // paddingTop: 20,
      marginBottom: 100,
      rowGap: 10,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
      backgroundColor: COLORS.bg,
    },
    cardlist: {
      justifyContent: "center",
      marginHorizontal: 16,
      alignItems: "center",
    },
    headerContainer: {
      alignItems: "center",
      marginVertical: 10,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: COLORS.opacity,
    },
    profileName: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 8,
      color: COLORS.textPrimary,
    },
    profileEmail: {
      fontSize: 14,
      color: COLORS.textSecondary,
    },
  });

export default ProfileScreen;
