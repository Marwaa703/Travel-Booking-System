import { StyleSheet } from "react-native";
import React from "react";
import ScreenFormContainer from "@/components/containers/ScreenFormContainer";
import Spacer from "@/components/Spacer";
import ScreenWraper from "@/components/containers/ScreenWraper";
import MultiStepTripForm from "@/components/forms/MultiStepForm";

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
