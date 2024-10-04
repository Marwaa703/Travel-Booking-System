import React, { useState } from "react";
import { View } from "react-native";
import CompanyUserForm from "./CompanyUserForm";
import CompanyDetailsForm from "./CompanyDetailsForm";
import CompanyPapersForm from "./CompanyPapersForm";
import { Company, CompanyPaper, CompanyUser, Gender } from "@/types/company";
import Button from "../Buttons";
import Spacer from "../Spacer";
import { useRouter } from "expo-router";
interface CompanyData {
  user: CompanyUser;
  details: Company;
  papers: CompanyPaper[];
}

const MultiStepRegisterCompanyForm = () => {
  const router = useRouter();

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

  const handlePapersSubmit = (data: CompanyPaper[]) => {
    setCompanyData((prev) => ({ ...prev, papers: data }));
    console.log("Final Company Data:", companyData);

    // todo:send to server
    // todo:get updated data from server
    // todo: update redux with new data

    router.push("/login");
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
