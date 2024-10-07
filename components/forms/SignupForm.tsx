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
import { useDispatch } from "react-redux";
import { signup } from "@/api/auth"; 
import { signupSuccess, signupFailure } from "@/redux/slices/authSlice"; 
import { router } from "expo-router";
import { Gender } from "@/types/company";

const SignupForm = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>("male");
  const dispatch = useDispatch(); 

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const handleSignup = async (data: any) => {
    console.log("start signup");
    const userData = { ...data, gender: selectedGender, role: "User" };
    console.log(userData);
    try {
      const response = await signup(userData);
      dispatch(signupSuccess({
        token: response.token,
        user: response.user, 
        role: response.user.role, 
      }));
      router.push("/(tabs)/(profile)/(user)/userProfile");
      reset();
    } catch (error: any) {
      dispatch(signupFailure(error.message || "Signup failed. Please try again."));
    }
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
        onPress={handleSubmit(handleSignup)} // Call handleSignup on form submission
        fontSize={FONTS.large}
      />
    </>
  );
};

export default SignupForm;
