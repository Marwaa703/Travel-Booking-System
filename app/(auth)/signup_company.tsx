import Padding from "@/components/containers/Padding";
import Header from "@/components/core/Header";
import MultiStepRegisterCompanyForm from "@/components/forms/MultiStepRegisterCompanyForm";
import Spacer from "@/components/Spacer";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const SignupCompany = () => {
  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }}>
      <Header
        title="Register your company now"
        rightIcon=""
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
      <Padding>
        <View style={styles.container}>
          {/* header */}
          <View style={styles.top}>
            <View style={styles.header}>
              {/* <Text style={styles.title}>Register your company now</Text> */}
            </View>
            {/* headerend  */}
            {/* form  */}
            <View>
              <MultiStepRegisterCompanyForm />
              {/* <View style={styles.center}>
                <Text style={styles.subTitle}>Already have an account?</Text>
                <LinkButton to={"login"} label="Sign In" />
              </View> */}
              <Spacer />
            </View>
          </View>
        </View>
      </Padding>
    </ScrollView>
  );
};

export default SignupCompany;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
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
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 6,
  },
  header: {
    textAlign: "center",
    alignItems: "center",
    height: "10%",
  },
  title: {
    fontSize: FONTS.xlarge,
  },
  subTitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSubtitle,
  },
});
