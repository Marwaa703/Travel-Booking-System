/* eslint-disable react-native/no-unused-styles */
import Padding from "@/components/containers/Padding";
import Header from "@/components/core/Header";
import MultiStepRegisterCompanyForm from "@/components/forms/MultiStepRegisterCompanyForm";
import Spacer from "@/components/Spacer";
import { FONTS, ColorPalette } from "@/constants/theme"; // Import ColorPalette
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/useTheme"; // Import useTheme

const SignupCompany = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);

  return (
    <ScrollView style={{ backgroundColor: theme.bg }}>
      <Header title="Register your company now" rightIcon="" leftIcon="" />
      <Padding>
        <View style={styles.container}>
          {/* header */}
          <View style={styles.top}>
            <View style={styles.header}>
              {/* <Text style={styles.title}>Register your company now</Text> */}
            </View>
            {/* header end */}
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

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
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

export default SignupCompany;
