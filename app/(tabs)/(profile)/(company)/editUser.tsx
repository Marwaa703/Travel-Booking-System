/* eslint-disable react-native/no-unused-styles */

import { StyleSheet, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ScreenWraper from "@/components/containers/ScreenWraper";
import Spacer from "@/components/Spacer";
import Padding from "@/components/containers/Padding";
import CompanyNewUserForm from "@/components/forms/CompanyNewUserForm";
import Header from "@/components/core/Header";
import { router } from "expo-router";
import { ColorPalette, COLORS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const EditUser = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const route = useRoute();
  const { user } = route.params as { user: string };
  const userData = JSON.parse(user);
  console.log(userData.role);
  return (
    <View style={styles.container}>
      <ScreenWraper>
        <Header
          title="Edit Company Users"
          leftIcon="arrow-back"
          onLeftIconPress={() => router.back()}
        />
        <Padding>
          <Spacer />
          <CompanyNewUserForm
            user={userData}
            companyId={userData?.company_id as string}
            type="update"
          />
        </Padding>
      </ScreenWraper>
    </View>
  );
};

export default EditUser;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg },
  });
