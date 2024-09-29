/* eslint-disable prettier/prettier */

import Padding from "@/components/containers/Padding";
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";
import LinkButton from "@/components/LinkButton";
import Spacer from "@/components/Spacer";
import { COLORS, FONTS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Signup = () => {
  return (
    <ScrollView>
      <Padding>
        <View style={styles.container}>
          {/* header */}
          <View style={styles.top}>
            <View style={styles.header}>
              <Text style={styles.title}>Sign Up now</Text>
              <Spacer />
              <Text style={styles.subTitle}>
                Please fill the details and create account
              </Text>
            </View>
            {/* headerend  */}
            {/* form  */}
            <View>
              <SignupForm />
              <Spacer />
              <View style={styles.center}>
                <Text style={styles.subTitle}>Already have an account?</Text>
                <LinkButton to={"login"} label="Sign In" />
              </View>
              <Spacer />
              <View style={{ marginHorizontal: "auto" }}>
                <LinkButton
                  style={styles.company}
                  to={"signup_company"}
                  label="Are you a Company? "
                />
              </View>
              <Spacer />
            </View>
          </View>
          {/* End form  */}
          {/* Bottom  */}
          <View style={styles.bottom}>
            <Text>Coming Soon ...!</Text>
            <Spacer />
            <View style={[styles.center, { width: "60%" }]}>
              <Ionicons name="logo-facebook" color={COLORS.link} size={40} />
              <Ionicons
                name="logo-instagram"
                color={COLORS.priceTag}
                size={40}
              />
              <Ionicons name="logo-twitter" color={"dodgerblue"} size={40} />
            </View>
          </View>
        </View>
      </Padding>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  top: {
    flex: 3,
    justifyContent: "space-evenly",
  },
  center: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  company: {
    color: COLORS.accent,
    fontSize: FONTS.medium,
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

  bottom: {
    flex: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "4%",
  },
});
