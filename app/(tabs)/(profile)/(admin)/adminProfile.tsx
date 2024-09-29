/* eslint-disable prettier/prettier */

import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants/theme";
import Header from "@/components/Header";
import SettingCard from "@/components/SettingContainer";

const AdminProfile = () => {
  return (
    <View>
      <Header />
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/7816/7816916.png" }}
          style={{ width: 200, height: 200, borderRadius: 50 }} 
        />
      </View>
      <Text style={{ color: COLORS.primary, textAlign: 'center', fontSize: FONTS.xlarge }}>Hello, Admin</Text>
      <SettingCard
        title={"Pending Requests"}
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
        leftIconName={undefined}
      />
      <SettingCard
        title={"Companies Approved"}
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
        leftIconName={undefined}
      />
      <SettingCard
        title={"Trips Analysis"}
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
        leftIconName={undefined}
      />
      <SettingCard
        title={"Register Users"}
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
        leftIconName={undefined}
      />
    </View>
  );
};

export default AdminProfile;
