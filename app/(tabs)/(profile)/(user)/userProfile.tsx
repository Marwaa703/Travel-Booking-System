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
import { COLORS } from "@/constants/theme";
import Header from "@/components/core/Header";
import { router } from "expo-router";
import useLogout from "@/hooks/useLogout";
import { useAppSelector } from "@/redux/store";
import { User } from "@/types/user";

const ProfileScreen: React.FC = () => {
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
        leftIcon="arrow-back"
        onRightIconPress={() => {
          router.push("/userEdit");
        }}
        onLeftIconPress={() => {
          router.back();
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.container}>
          <View>
            {/* Profile Header */}
            <View style={styles.headerContainer}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
                }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{user?.first_name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
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
            <SettingCard
              title="Log Out"
              onPress={() => logout()}
              leftIconName="logout"
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
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
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
    fontWeight: "bold",
    marginVertical: 10,
    color: COLORS.textPrimary,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default ProfileScreen;
