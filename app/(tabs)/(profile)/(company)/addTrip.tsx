/* eslint-disable react-native/no-unused-styles */

import { StyleSheet } from "react-native";
import React from "react";
import Spacer from "@/components/Spacer";
import ScreenWraper from "@/components/containers/ScreenWraper";
import MultiStepAddTripForm from "@/components/forms/MultiStepAddTripForm";
import { useRoute } from "@react-navigation/native";
import Padding from "@/components/containers/Padding";
import Header from "@/components/core/Header";
import { router } from "expo-router";
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const AddTrip = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);

  const route = useRoute();

  const { companyId } = route.params as { companyId: string };
  console.log({ companyIds: companyId });
  return (
    <ScreenWraper>
      <Header
        title="Add Trip"
        leftIcon="arrow-back"
        rightIcon=""
        onLeftIconPress={() => router.back()}
      />
      <Spacer height={28} />
      <Padding>
        <MultiStepAddTripForm companyId={companyId} />
      </Padding>
    </ScreenWraper>
  );
};

export default AddTrip;
const stylesObj = (COLORS: ColorPalette) => StyleSheet.create({});
