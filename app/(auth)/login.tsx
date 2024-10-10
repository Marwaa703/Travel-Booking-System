import Padding from "@/components/containers/Padding";
import LoginForm from "@/components/forms/LoginForm";
import LinkButton from "@/components/LinkButton";
import OnboardingComingSoon from "@/components/OnboardingComingSoon";
import Spacer from "@/components/Spacer";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
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
  const role = auth?.role as UserTypes;
  useEffect(() => {
    // load companies, current company users,
    if (auth?.isAuthenticated) {
      // user => companies(10), trips(10)(tripImages),
      if (role === "User") {
        dispatch(fetchTrips());
        dispatch(fetchCompanies());
      }

      // CompanyUser =>  Companytrips(tripImages), CompanyUsers, CompanyImages,
      if (role === "Company") {
        // admin from company
        dispatch(fetchTrips()); //select companyTrips only from trips
        dispatch(fetchCompanies());
      }
      // Admin => companies(10), trips(10)(tripImages), CompanyUsers(per company), CompanyImages(per company), Users,
      if (role === "Admin") {
        dispatch(fetchTrips());
        dispatch(fetchCompanies());
        dispatch(fetchUsers());
      }
    }
  }, [auth, role]);

  return (
    <Padding>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.top}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign in now</Text>
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

        <OnboardingComingSoon />
      </View>
    </Padding>
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
    flex: 2,
    justifyContent: "space-evenly",
  },
  center: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
