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
import { selectCompanyById } from "@/redux/slices/companiesSlice";
import { Company, CompanyUser } from "@/types/company";
import useLogout from "@/hooks/useLogout";
import { fetchTrips } from "@/redux/actions/tripActions";
import ApprovedState from "@/components/company/ApprovedState";
const CompanyProfile: React.FC = () => {
  const logout = useLogout();
  const user = useAppSelector(
    (state) => state.auth.currentUser,
  ) as unknown as CompanyUser;
  const token = useAppSelector((state) => state.auth.token);

  const currentCompany = useAppSelector((state) =>
    selectCompanyById(state, user?.company_id as string),
  ) as Company;

  const dispatch = useAppDispatch();

  useEffect(() => {
    // admin from company
    dispatch(fetchTrips()); //select companyTrips only from trips
  }, [dispatch]);
  const approved = currentCompany?.approved;
  useEffect(() => {
    console.log({ token });
    if (!token) logout();
    console.log({ auth: "no " });
  }, [token, logout]);
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
                  source={{ uri: currentCompany?.logo }}
                  style={styles.companyLogo}
                />
                <Text style={styles.companyName}>{currentCompany?.name}</Text>
                <Text style={styles.companyEmail}>
                  <ApprovedState approved={approved as boolean} />
                </Text>
              </View>

              <SettingCard
                title="Details"
                onPress={() => router.push("companyDetails")}
                leftIconName="business"
              />
              {/* disable if not approved */}
              {approved && (
                <>
                  <SettingCard
                    title="Trips"
                    onPress={() => {
                      router.push(
                        `companyTrips/?companyId=${user?.company_id}`,
                      );
                    }}
                    leftIconName="air"
                  />
                  <SettingCard
                    title="Manage Employees"
                    onPress={() => {
                      router.push(
                        `companyUsers/?companyId=${user?.company_id}`,
                      );
                    }}
                    leftIconName="people"
                  />
                  <SettingCard
                    title="Company Settings"
                    onPress={() => {}}
                    leftIconName="settings"
                  />
                </>
              )}
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
