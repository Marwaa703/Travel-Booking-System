import { StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ScreenWraper from "@/components/containers/ScreenWraper";
import Spacer from "@/components/Spacer";
import Padding from "@/components/containers/Padding";
import CompanyNewUserForm from "@/components/forms/CompanyNewUserForm";

const AddUser = () => {
  const route = useRoute();
  const { companyId } = route.params as { companyId: string };
  console.log({ companyId });

  return (
    <ScreenWraper>
      <Padding>
        <Spacer />
        <CompanyNewUserForm companyId={companyId} />
      </Padding>
    </ScreenWraper>
  );
};

export default AddUser;

const styles = StyleSheet.create({});
