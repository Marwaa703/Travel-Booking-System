import { StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ScreenWraper from "@/components/containers/ScreenWraper";
import Spacer from "@/components/Spacer";
import Padding from "@/components/containers/Padding";
import CompanyNewUserForm from "@/components/forms/CompanyNewUserForm";
import { User } from "@/types/user";
import Header from "@/components/core/Header";
import { router } from "expo-router";

const EditUser = () => {
  const route = useRoute();
  const { user } = route.params as { user: string };

  return (
    <ScreenWraper>
      <Header
        title="Edit Company Users"
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
      <Padding>
        <Spacer />
        <CompanyNewUserForm
          user={JSON.parse(user)}
          companyId={user?.company_id as string}
          type="update"
        />
      </Padding>
    </ScreenWraper>
  );
};

export default EditUser;

const styles = StyleSheet.create({});
