import Padding from "@/components/containers/Padding";
import Header from "@/components/core/Header";
import SignupForm from "@/components/forms/SignupForm";
import LinkButton from "@/components/LinkButton";
import Spacer from "@/components/Spacer";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Signup = () => {
  return (
    <>
      {/* need return button here */}
      <Header
        title="Signup"
        rightIcon=""
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
      <ScrollView style={{ backgroundColor: COLORS.bg }}>
        <Padding>
          <View style={styles.container}>
            {/* header */}
            <View style={styles.top}>
              <View style={styles.header}>
                {/* <Text style={styles.title}>Sign Up now</Text> */}
                <Spacer height={24} />
                <Text style={styles.subTitle}>
                  Please fill the details and create account
                </Text>
              </View>
              {/* header_end  */}
              {/* form  */}
              <View>
                <SignupForm />
                <Spacer />
                <View style={styles.center}>
                  <Text style={styles.subTitle}>Already have an account?</Text>
                  <LinkButton to={"login"} label="Sign In" />
                </View>
                <Spacer height={26} />
                <View style={{ marginHorizontal: "auto" }}>
                  <LinkButton
                    style={styles.company}
                    to={"signup_company"}
                    label="Are you a Company?"
                  />
                </View>
                <Spacer />
              </View>
            </View>
            {/* End form  */}
            {/* Bottom  */}
          </View>
        </Padding>
      </ScrollView>
    </>
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
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 6,
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
});
