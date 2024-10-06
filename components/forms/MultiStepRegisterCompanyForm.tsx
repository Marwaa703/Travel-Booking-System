import React, { useState } from "react";
import { View } from "react-native";
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
import { signupCompany } from "@/api/auth";
import { useAppDispatch } from "@/redux/store";
import { addCompany, addPapers, addUser } from "@/redux/slices/companiesSlice";

const MultiStepRegisterCompanyForm = () => {
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
    setCompanyData((prev) => ({ ...prev, papers: data }));
    console.log("Final Company Data:", companyData);

    // todo:send to server
    // todo:get updated data from server
    const updatedCompanyData = await signupCompany(companyData);
    console.log({ updatedCompanyData });

    dispatch(addCompany(updatedCompanyData.details));
    dispatch(addPapers(updatedCompanyData.papers));
    dispatch(addUser(updatedCompanyData.user));

    // todo: update redux with new data

    router.replace("/(tabs)/(profile)/(company)/companyProfile");
  };

  return (
    <View style={{ width: "100%" }}>
      {currentStep === 1 && <CompanyUserForm onNext={handleUserNext} />}
      {currentStep === 2 && <CompanyDetailsForm onNext={handleDetailsNext} />}
      {currentStep === 3 && <CompanyPapersForm onSubmit={handlePapersSubmit} />}
      <Spacer />
      {currentStep > 1 && (
        <Button title="Back" onPress={() => setCurrentStep(currentStep - 1)} />
      )}
    </View>
  );
};

export default MultiStepRegisterCompanyForm;
