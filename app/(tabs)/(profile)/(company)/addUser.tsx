import { StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ScreenWraper from "@/components/containers/ScreenWraper";
import Spacer from "@/components/Spacer";
import Padding from "@/components/containers/Padding";
import CompanyNewUserForm from "@/components/forms/CompanyNewUserForm";
import Header from "@/components/core/Header";
import { router } from "expo-router";

const AddUser = () => {
  const route = useRoute();
  const { companyId } = route.params as { companyId: string };
  console.log({ companyId });

  return (
    <ScreenWraper>
      <Header
        title="Add Company Users"
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
      <Padding>
        <Spacer />
        <CompanyNewUserForm type="new" companyId={companyId} />
      </Padding>
    </ScreenWraper>
  );
};

export default AddUser;

const styles = StyleSheet.create({});
