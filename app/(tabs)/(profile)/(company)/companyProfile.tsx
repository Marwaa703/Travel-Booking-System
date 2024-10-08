/* eslint-disable prettier/prettier */
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
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectCompanyById } from "@/redux/slices/companiesSlice";
import { Company, CompanyUser } from "@/types/company";
import useLogout from "@/hooks/useLogout";
const CompanyProfile: React.FC = () => {
  const logout = useLogout();
  // todo: set the current company id current CompanyUser
  const user = useAppSelector(
    (state) => state.auth.currentUser,
  ) as unknown as CompanyUser;
  const companies = useAppSelector((state) => state.companies.companies);
  console.log({ cid: user.company_id, companies });

  const currentCompany = useAppSelector((state) =>
    selectCompanyById(state, user.company_id as string),
  ) as Company;
  console.log({ currentCompany });
  

  return (
    <>
      <Header
        title="Company Profile"
        rightIcon="exit-outline"
        leftIcon="arrow-back"
        onRightIconPress={() => logout()}
        onLeftIconPress={() => {
          router.back();
        }}
      />
      {currentCompany && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SafeAreaView style={styles.container}>
            <View>
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: currentCompany.logo }}
                  style={styles.companyLogo}
                />
                <Text style={styles.companyName}>{currentCompany.name}</Text>
                <Text style={styles.companyEmail}>
                  {currentCompany.address}
                </Text>
              </View>

              <SettingCard
                title="Company Profile"
                onPress={() => router.push("companyDetails")}
                leftIconName="business"
              />
               <SettingCard
                title="Trips"
                onPress={() => {
                  router.push(`companyHome/?companyId=${user.company_id}`);
                }}
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
      )}
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
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.opacity,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: COLORS.textPrimary,
  },
  companyEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default CompanyProfile;
