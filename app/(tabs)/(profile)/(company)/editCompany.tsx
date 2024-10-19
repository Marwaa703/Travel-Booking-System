/* eslint-disable react-native/no-unused-styles */

import { StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ScreenWraper from "@/components/containers/ScreenWraper";
import Spacer from "@/components/Spacer";
import Padding from "@/components/containers/Padding";
import CompanyNewUserForm from "@/components/forms/CompanyNewUserForm";
import { User } from "@/types/user";
import { Company, CompanyEditSection } from "@/types/company";
import CompanyDetailsForm from "@/components/forms/CompanyDetailsForm";
import CompanyPapersForm from "@/components/forms/CompanyPapersForm";
import CompanyUserForm from "@/components/forms/CompanyUserForm";
import { useAppDispatch } from "@/redux/store";
import { updateCompanyDetails } from "@/redux/actions/companiesActions";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ColorPalette } from "@/constants/theme";

const EditCompany = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const route = useRoute();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = route.params as { data: string };
  const { section } = route.params as { section: CompanyEditSection };
  const editData = JSON.parse(data);
  console.log({ section });
  //   admin_msg `EditSection, msge here`

  const form =
    section === "Details" ? (
      <CompanyDetailsForm
        onNext={(data) => handleEditDetails(data)}
        initialData={editData}
      />
    ) : section === "Papers" ? (
      <CompanyPapersForm onSubmit={(data) => console.log({ data })} />
    ) : (
      <CompanyUserForm onNext={(data) => console.log({ data })} />
    );

  const handleEditDetails = (details: Partial<Company>) => {
    dispatch(
      updateCompanyDetails({ ...details, status: "pending", approved: false }),
    )
      .then((data) => {
        console.log({ data });
        router.back();
      })
      .catch((e) => console.log({ e }));
  };
  return (
    <ScreenWraper>
      <Padding>
        <Spacer />
        {form}
      </Padding>
    </ScreenWraper>
  );
};

export default EditCompany;

const stylesObj = (COLORS: ColorPalette) => StyleSheet.create({});
