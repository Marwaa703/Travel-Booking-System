import { login } from "@/api/auth";
import Padding from "@/components/containers/Padding";
import Header from "@/components/core/Header";
import LoginForm from "@/components/forms/LoginForm";
import LinkButton from "@/components/LinkButton";
import OnboardingComingSoon from "@/components/OnboardingComingSoon";
import Spacer from "@/components/Spacer";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import useLogout from "@/hooks/useLogout";
import { fetchCompanies } from "@/redux/actions/companiesActions";
import { fetchTrips } from "@/redux/actions/tripActions";
import { fetchUsers } from "@/redux/actions/usersActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { UserTypes } from "@/types/user";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Login = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const role = auth?.role;
  const logout = useLogout();
  const companyId =
    auth?.role === "Company" ? auth?.currentUser?.company_id : "";

  // call api to check token from saved user data(auth) ?token
  useEffect(() => {
    // load companies, current company users,
    if (auth?.isAuthenticated && auth?.token) {
      // user => companies(10), trips(10)(tripImages),
      if (role === "User") {
        dispatch(fetchTrips());
        dispatch(fetchCompanies());
      }

      // CompanyUser =>  Companytrips(tripImages) only, CompanyUsers, CompanyImages,
      if (role === "Company") {
        // admin from company
        console.log({ RepCompanyId: companyId });
        dispatch(fetchTrips(companyId)); //select companyTrips only from trips
        dispatch(fetchCompanies());
      }
      // Admin => companies(10), trips(10)(tripImages), CompanyUsers(per company), CompanyImages(per company), Users,
      if (role === "Admin") {
        dispatch(fetchTrips());
        dispatch(fetchCompanies());
        dispatch(fetchUsers());
      }
    }
  }, [auth, companyId, dispatch, role]);

  return (
    <>
      <Header title="Sign in Now" rightIcon="" leftIcon="" />
      <Padding>
        <View style={styles.container}>
          {/* header */}
          <View style={styles.top}>
            <View style={styles.header}>
              {/* <Text style={styles.title}>Sign in now</Text> */}
              <Spacer />
              <Text style={styles.subTitle}>
                Please sign in to continue our app
              </Text>
            </View>
            {/* headerend  */}
            {/* form  */}
            <View>
              <LoginForm />
              <Spacer />
              <View style={styles.center}>
                <Text style={styles.subTitle}>Don’t have an account?</Text>
                <LinkButton to={"signup"} label="Sign Up" />
              </View>
            </View>
          </View>
          {/* End form  */}
          {/* Bottom  */}

          {/* <OnboardingComingSoon /> */}
        </View>
      </Padding>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.large,
  },
  top: {
    // flex: 4,
    justifyContent: "space-evenly",
  },
  center: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 6,
  },
  header: {
    textAlign: "center",
    alignItems: "center",
    height: "15%",
  },
  title: {
    fontSize: FONTS.xlarge,
  },
  subTitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSubtitle,
  },
});
