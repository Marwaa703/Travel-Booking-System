import React, { useEffect } from "react";
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
import { selectCompanyById, setCompanies } from "@/redux/slices/companiesSlice";
import companies from "@/DummyData/companiesUpdated.json";
import { Company, CompanyUser } from "@/types/company";
import useLogout from "@/hooks/useLogout";
const CompanyProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const logout = useLogout();
  // todo: set the current company id current CompanyUser
  const user = useAppSelector((state) => state.auth.currentUser) as CompanyUser;
  const currentCompany = useAppSelector((state) =>
    selectCompanyById(state, "1"),
  ) as Company;
  console.log({ currentCompany, user });

  useEffect(() => {
    dispatch(setCompanies(companies.companies));
  }, [dispatch]);

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.container}>
          <View>
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: currentCompany.logo }}
                style={styles.companyLogo}
              />
              <Text style={styles.companyName}>{currentCompany.name}</Text>
              <Text style={styles.companyEmail}>{currentCompany.address}</Text>
            </View>

            <SettingCard
              title="Company Profile"
              onPress={() => {}}
              leftIconName="business"
            />
            <SettingCard
              title="Trips"
              onPress={() => {
                router.push("companyHome");
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
