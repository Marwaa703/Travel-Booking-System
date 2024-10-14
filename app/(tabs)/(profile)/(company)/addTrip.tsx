import { StyleSheet } from "react-native";
import React from "react";
import Spacer from "@/components/Spacer";
import ScreenWraper from "@/components/containers/ScreenWraper";
import MultiStepAddTripForm from "@/components/forms/MultiStepAddTripForm";
import { useRoute } from "@react-navigation/native";
import Padding from "@/components/containers/Padding";

const AddTrip = () => {
  const route = useRoute();

  const { companyId } = route.params as { companyId: string };
  console.log({ companyIds: companyId });
  return (
    <ScreenWraper>
      <Spacer height={28} />
      <Padding>
        <MultiStepAddTripForm companyId={companyId} />
      </Padding>
    </ScreenWraper>
  );
};

export default AddTrip;
const styles = StyleSheet.create({});
