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
import { Company, CompanyApproveStatus, CompanyUser } from "@/types/company";
import useLogout from "@/hooks/useLogout";
import { fetchTrips } from "@/redux/actions/tripActions";
import CompanyStatus from "@/components/company/CompanyStatus";
import Spacer from "@/components/Spacer";
import Toast from "react-native-toast-message";
import ActionButton from "@/components/buttons/ActionButton";
import { adminMsgSpliter } from "@/constants/admin";
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
    dispatch(fetchTrips());
  }, [dispatch]);

  const approved = currentCompany?.approved;
  const status: CompanyApproveStatus =
    currentCompany?.status as CompanyApproveStatus;

  useEffect(() => {
    if (!token) logout();
  }, [token, logout]);

  // Safely split admin message
  const adminMessage = currentCompany?.admin_msg || ""; // Fallback to empty string
  const [section, msg] = adminMessage.split(adminMsgSpliter);

  return (
    <>
      <Header
        title="Company Profile"
        rightIcon="exit-outline"
        leftIcon="arrow-back"
        onRightIconPress={logout}
        onLeftIconPress={router.back}
      />
      {/* <ActionButton
        text="Check"
        onPress={() => {
          console.log({ status, approved, section, msg });
        }}
      /> */}
      <Toast />
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
                  <CompanyStatus status={status as CompanyApproveStatus} />
                </Text>
              </View>
              <Spacer height={24} />

              {approved === true && status === "approved" && (
                <>
                  <Text>{adminMessage}</Text>
                  <Spacer height={16} />
                </>
              )}
              {approved === false && status === "rejected" && (
                <>
                  <Text>Rejection Note: {msg && msg}</Text>
                  <Spacer height={16} />
                  <SettingCard
                    title={`Edit Company ${section}`}
                    onPress={() =>
                      router.push(
                        `/editCompany?section=${section}&data=${encodeURIComponent(JSON.stringify(currentCompany))}`,
                      )
                    }
                    leftIconName="business"
                  />
                  <Spacer height={16} />
                </>
              )}
              <SettingCard
                title="Details"
                onPress={() => router.push("companyDetails")}
                leftIconName="business"
              />
              <Spacer height={16} />
              {approved && status === "approved" && (
                <>
                  <SettingCard
                    title="Trips"
                    onPress={() =>
                      router.push(`companyTrips/?companyId=${user?.company_id}`)
                    }
                    leftIconName="air"
                  />
                  <Spacer height={16} />
                  <SettingCard
                    title="Manage Employees"
                    onPress={() =>
                      router.push(`companyUsers/?companyId=${user?.company_id}`)
                    }
                    leftIconName="people"
                  />
                  <Spacer height={16} />
                  <SettingCard
                    title="Company Settings"
                    onPress={() => {}}
                    leftIconName="settings"
                  />
                </>
              )}
              <Spacer height={16} />
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
    marginBottom: 100,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: COLORS.bg,
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.opacity,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 8,
    color: COLORS.textPrimary,
  },
  companyEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default CompanyProfile;
