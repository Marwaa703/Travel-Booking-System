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
import { adminMsgSpliter } from "@/constants/admin";
import { fetchCompanies } from "@/redux/actions/companiesActions";
import ScreenWraper from "@/components/containers/ScreenWraper";
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
    dispatch(fetchCompanies());
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
    <View style={{ backgroundColor: COLORS.bg, flex: 1 }}>
      <ScreenWraper>
        <Header
          title="Company Profile"
          rightIcon="exit-outline"
          onRightIconPress={() => logout()}
          onLeftIconPress={() => () => {}}
          leftIcon="arrow-back"
        />
        <Toast />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {currentCompany && (
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
                {/* improved: should be displayed once */}
                {/* {approved === true && status === "approved" && (
                <>
                  <Text>{adminMessage}</Text>
                  <Text style={{ textAlign: "center" }}>
                    Start adding trips
                  </Text>
                  <Spacer height={16} />
                </>
              )} */}
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
                {approved && status === "approved" && (
                  <>
                    <Spacer height={16} />
                    <SettingCard
                      title="Trips"
                      onPress={() =>
                        router.push(
                          `companyTrips/?companyId=${user?.company_id}`,
                        )
                      }
                      leftIconName="air"
                    />
                    <Spacer height={16} />
                    <SettingCard
                      title="Manage Employees"
                      onPress={() =>
                        router.push(
                          `companyUsers/?companyId=${user?.company_id}`,
                        )
                      }
                      leftIconName="people"
                    />
                    {/* <Spacer height={16} />
                    <SettingCard
                      title="Company Settings"
                      onPress={() => {}}
                      leftIconName="settings"
                    /> */}
                  </>
                )}
                <Spacer height={16} />
                <SettingCard
                  title="Settings"
                  onPress={() => {
                    router.push("/(profile)/settings");
                  }}
                  leftIconName="tune"
                />
              </View>
            </SafeAreaView>
          )}
        </ScrollView>
      </ScreenWraper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingBottom: 100,
    backgroundColor: COLORS.bg,
  },
  scrollContainer: {
    // flexGrow: 1,
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
    backgroundColor: COLORS.bg_surface,
  },
  companyName: {
    fontSize: 20,
    // fontWeight: "500",
    letterSpacing: 0.5,
    marginTop: 8,
    color: COLORS.textPrimary,
  },
  companyEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default CompanyProfile;
