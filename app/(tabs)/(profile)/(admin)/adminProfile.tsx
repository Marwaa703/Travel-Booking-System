import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS } from "@/constants/theme";
import Header from "@/components/core/Header";
import SettingCard from "@/components/SettingContainer";
import { router } from "expo-router";
import Padding from "@/components/containers/Padding";
import ScreenWraper from "@/components/containers/ScreenWraper";
import useLogout from "@/hooks/useLogout";
import Spacer from "@/components/Spacer";

const AdminProfile: React.FC = () => {
  const handleLogout = useLogout();
  return (
    <ScreenWraper>
      <Padding>
        <Header rightIcon="exit-outline" onRightIconPress={handleLogout} />
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/7816/7816916.png",
            }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.greetingText}>Hello, Admin</Text>
        <Spacer />
        <SettingCard
          title="Pending Requests"
          onPress={() => {
            router.push("pending");
          }}
          leftIconName="pending-actions"
        />

        <Spacer height={16} />
        <SettingCard
          title="Companies Approved"
          onPress={() => {
            router.push("approved");
          }}
          leftIconName="verified"
        />
        <Spacer height={16} />
        <SettingCard
          title="Trips Analysis"
          onPress={() => {
            router.push("tripAnalysis");
          }}
          leftIconName="bar-chart"
        />
        <Spacer height={16} />
        <SettingCard
          title="Register Users"
          onPress={() => {
            router.push("registerUser");
          }}
          leftIconName="person-add"
        />
        <SettingCard
          title="Settings"
          onPress={() => {
            router.push("/(profile)/settings");
          }}
          leftIconName="person-add"
        />
        <Spacer height={16} />
      </Padding>
    </ScreenWraper>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
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
