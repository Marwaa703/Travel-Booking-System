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
import useLoadingState from "@/hooks/useLoadingSate";

const SignupForm = () => {
  const {loading,msg,setLoading,setMsg}= useLoadingState();
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
    setLoading(true);
    setMsg("Registering your information")
    const userData = { ...data, gender: selectedGender, role: "User" };
    // console.log(userData);
    try {
      const response = await signup(userData);

      if (!response || !response.token || !response.user) {
        throw new Error("Invalid response from server");
      }

      dispatch(signupSuccess({
        token: response.token,
        user: response.user,
        role: response.user.role,
      }));
      console.log({response})
      router.replace("/login");
      reset();
    } catch (error: any) {
      console.error("Signup failed:", error.message);
      dispatch(signupFailure(error.message || "Signup failed. Please try again."));
    }finally{
      setLoading(false);
      setMsg("")
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
        fontSize={FONTS.large} loadingMessage={msg} loading={loading}      />
    </>
  );
};

export default SignupForm;
