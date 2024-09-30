import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ScreenFormContainer from "@/components/containers/ScreenFormContainer";
import LoginForm from "@/components/forms/LoginForm";
import Spacer from "@/components/Spacer";
import LinkButton from "@/components/LinkButton";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import AddTripForm from "@/components/forms/AddTripForm";
import ScreenWraper from "@/components/containers/ScreenWraper";
import MultiStepTripForm from "@/components/forms/MultiStepForm";
import Padding from "@/components/containers/Padding";

const AddTrip = () => {
  return (
    <ScreenWraper>
      <Spacer />
      <ScreenFormContainer
        title="Add New Trip"
        subTitle="Please fill the following details!"
        topFlex={4}
      >
        <MultiStepTripForm />
      </ScreenFormContainer>
    </ScreenWraper>
  );
};

export default AddTrip;
const styles = StyleSheet.create({});
