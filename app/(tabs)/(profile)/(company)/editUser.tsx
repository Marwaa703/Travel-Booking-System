import { StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ScreenWraper from "@/components/containers/ScreenWraper";
import Spacer from "@/components/Spacer";
import Padding from "@/components/containers/Padding";
import CompanyNewUserForm from "@/components/forms/CompanyNewUserForm";
import { User } from "@/types/user";

const EditUser = () => {
  const route = useRoute();
  const { user } = route.params as { user: string };
  const userData = JSON.parse(user);
  console.log(userData.role);
  return (
    <ScreenWraper>
      <Padding>
        <Spacer />
        <CompanyNewUserForm
          user={userData}
          companyId={userData?.company_id as string}
          type="update"
        />
      </Padding>
    </ScreenWraper>
  );
};

export default EditUser;

const styles = StyleSheet.create({});
