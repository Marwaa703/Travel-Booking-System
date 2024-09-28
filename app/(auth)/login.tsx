import Padding from "@/components/containers/Padding";
import LoginForm from "@/components/forms/LoginForm";
import LinkButton from "@/components/LinkButton";
import Spacer from "@/components/Spacer";
import { COLORS, FONTS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Login = () => {
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
        <View style={styles.bottom}>
          <Text>Coming Soon ...!</Text>
          <Spacer />
          <View style={[styles.center, { width: "60%" }]}>
            <Ionicons name="logo-facebook" color={COLORS.link} size={40} />
            <Ionicons name="logo-instagram" color={COLORS.priceTag} size={40} />
            <Ionicons name="logo-twitter" color={"dodgerblue"} size={40} />
          </View>
        </View>
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

  bottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: "5%",
  },
});
