import React, { useState } from "react";
import {
  companyUserSignupInputs,
  companyUserSignupSchema,
} from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { SPACING } from "@/constants/theme";
import AppTextInput from "./AppTextInput";
import GenderPicker from "./GenderPicker";
import Spacer from "../Spacer";
import { Text } from "react-native";

const CompanyUserSignupForm = () => {
  const [selectedGender, setSelectedGender] = useState("male");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companyUserSignupSchema),
  });

  const handleSignup = (data: any) => {
    const user = {
      ...data,
      gender: selectedGender,
    };
    console.log();
    console.log(user);

    // reset
    reset();
  };

  //   console.log({ errors, selectedGender });

  return (
    <>
      {companyUserSignupInputs.map(
        ({ icon, name, autoCapitalize, keyboardType }) => (
          <AppTextInput
            key={name}
            name={name}
            control={control as unknown as Control<FieldValues>}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            icon={icon}
            error={errors[name]?.message}
            secureTextEntry={name === "password"}
          />
        ),
      )}
      <Text style={{ marginVertical: SPACING.medium }}>Select your gender</Text>
      <GenderPicker
        setSelectedGender={setSelectedGender}
        selectedGender={selectedGender}
      />
      <Spacer />
      <Spacer />
      {/* tobe adjusted */}
      <Button title="Sign Up" onPress={handleSubmit(handleSignup)} />
    </>
  );
};

export default CompanyUserSignupForm;
