/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import { signupInputs, signupSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { FONTS, SPACING } from "@/constants/theme";
import AppTextInput from "./AppTextInput";
import GenderPicker from "./GenderPicker";
import Spacer from "../Spacer";
import { Text } from "react-native";

const SignupForm = () => {
  const [selectedGender, setSelectedGender] = useState("male");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const handleSignup = (data: any) => {
    console.log("lol");
    console.log(JSON.stringify(data));

    // reset
    // reset();
  };

  console.log({ errors, selectedGender });

  return (
    <>
      {signupInputs.map(({ icon, name, autoCapitalize, keyboardType }) => (
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
      ))}
      <Text style={{ marginVertical: SPACING.medium }}>Select your gender</Text>
      <GenderPicker
        setSelectedGender={setSelectedGender}
        selectedGender={selectedGender}
      />
      <Spacer />
      <Button
        title="Sign Up"
        onPress={handleSubmit(handleSignup)}
        fontSize={FONTS.large}
      />
    </>
  );
};

export default SignupForm;
