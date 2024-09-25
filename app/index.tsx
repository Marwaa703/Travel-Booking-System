import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { router } from "expo-router";
import Rating from "@/components/Rating";
import Like from "@/components/Like";
import CardSubtitle from "@/components/CardSubtitle";
import icons from "@/constants/icons";
import { COLORS } from "@/constants/theme";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        onPress={() => {
          router.push("/login");
        }}
        title="This button redirect to Login screen"
      />
      <Rating rate={3.5} />
      <Like />
      <CardSubtitle
        text="Country"
        icon={icons.location}
        iconColor={COLORS.cardIcon}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
