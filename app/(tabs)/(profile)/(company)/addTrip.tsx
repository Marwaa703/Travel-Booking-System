import { StyleSheet } from "react-native";
import React from "react";
import ScreenFormContainer from "@/components/containers/ScreenFormContainer";
import Spacer from "@/components/Spacer";
import ScreenWraper from "@/components/containers/ScreenWraper";
import MultiStepAddTripForm from "@/components/forms/MultiStepAddTripForm";
import { useRoute } from "@react-navigation/native";

const AddTrip = () => {
  const route = useRoute();

  const { companyId } = route.params as { companyId: string };
  console.log({ companyIds: companyId });
  return (
    <ScreenWraper>
      <Spacer />
      <ScreenFormContainer
        title="Add New Trip"
        subTitle="Please fill the following details!"
        topFlex={4}
      >
        <MultiStepAddTripForm />
      </ScreenFormContainer>
    </ScreenWraper>
  );
};

export default AddTrip;
const styles = StyleSheet.create({});
