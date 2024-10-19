/* eslint-disable react-native/no-unused-styles */
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CompanyUserForm from "./CompanyUserForm";
import CompanyDetailsForm from "./CompanyDetailsForm";
import CompanyPapersForm from "./CompanyPapersForm";
import {
  Company,
  CompanyData,
  CompanyPaper,
  CompanyUser,
  Gender,
} from "@/types/company";
import Button from "../Buttons";
import Spacer from "../Spacer";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/redux/store";
import { addCompany } from "@/redux/slices/companiesSlice";
import useLoadingState from "@/hooks/useLoadingSate";
import { signupCompany } from "@/api/auth";
import { ColorPalette, COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const MultiStepRegisterCompanyForm = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const { loading, msg, setLoading, setMsg } = useLoadingState();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyData, setCompanyData] = useState<CompanyData>({
    user: {} as CompanyUser,
    details: {} as Company,
    papers: [],
  });

  const handleUserNext = (data: CompanyUser, gender: Gender) => {
    setCompanyData((prev) => ({ ...prev, user: { ...data, gender } }));
    setCurrentStep(2);
  };

  const handleDetailsNext = (data: Company) => {
    setCompanyData((prev) => ({ ...prev, details: data }));
    setCurrentStep(3);
  };

  const handlePapersSubmit = async (data: CompanyPaper[]) => {
    console.log({ papers: data });
    try {
      setLoading(true);
      setMsg("Registerinig Company...");
      setCompanyData((prev) => ({ ...prev, papers: data }));
      const finalCompanyData: CompanyData = { ...companyData, papers: data };
      console.log("Final Company Data:", companyData);

      // todo:send to server
      // todo:get updated data from server
      const updatedCompanyData = await signupCompany(finalCompanyData);
      console.log("Final Company Response:", updatedCompanyData);
      console.log({ updatedCompanyData });
      if (updatedCompanyData.success) {
        dispatch(addCompany(updatedCompanyData.details as Company));
        // todo: update redux with new data
        router.replace("/login");
      }
    } catch (error) {
      setMsg("error registering company...");
      setLoading(false);
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };
  const steps = [
    "Company Representitive Information",
    "Company Details",
    "Company Papers",
  ];
  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.subTitle}>{steps[currentStep - 1]}</Text>
      <Spacer />
      {currentStep === 1 && <CompanyUserForm onNext={handleUserNext} />}
      {currentStep === 2 && <CompanyDetailsForm onNext={handleDetailsNext} />}
      {currentStep === 3 && (
        <CompanyPapersForm
          loading={loading}
          msg={msg}
          onSubmit={handlePapersSubmit}
        />
      )}
      <Spacer />
      {currentStep > 1 && (
        <Button title="Back" onPress={() => setCurrentStep(currentStep - 1)} />
      )}
    </View>
  );
};

export default MultiStepRegisterCompanyForm;
const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    subTitle: {
      fontSize: FONTS.medium,
      color: COLORS.textSubtitle,
    },
  });
