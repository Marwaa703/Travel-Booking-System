import React, { useState } from "react";
import { signupInputs, signupSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { FONTS } from "@/constants/theme";
import AppTextInput from "./AppTextInput";
import GenderPicker from "./GenderPicker";
import Spacer from "../Spacer";
import { useDispatch } from "react-redux";
import { signup } from "@/api/auth";
import { signupSuccess } from "@/redux/slices/authSlice";
import { router } from "expo-router";
import { Gender } from "@/types/company";
import useLoadingState from "@/hooks/useLoadingSate";
import TermsAndConditions from "../admin/TermsAndConditions";

const SignupForm = () => {
  const [agrred, setAgrred] = useState(false);
  const { loading, msg, setLoading, setMsg } = useLoadingState();
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
    setMsg("Registering your information");
    const userData = { ...data, gender: selectedGender, role: "User" };
    // console.log(userData);
    try {
      const response = await signup(userData);
      console.log({ response });
      if (!response.success) {
        setMsg("Invalid response from server");
        console.log("error not comp");
        return;
      }

      dispatch(
        signupSuccess({
          token: response?.data?.token,
          user: response?.data?.user,
          role: response?.data?.user?.role,
        }),
      );
      console.log("end");
      router.replace("/login");
      reset();
    } catch (error: any) {
      console.error("Signup failed:", error);
      // dispatch(
      //   signupFailure(error.message || "Signup failed. Please try again."),
      // );
    } finally {
      setLoading(false);
      setMsg("");
    }
  };
  console.log({ agrred });
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
      <GenderPicker
        setSelectedGender={setSelectedGender}
        selectedGender={selectedGender}
      />
      <TermsAndConditions onAgree={(checked) => setAgrred(checked)} />
      <Button
        title="Sign Up"
        onPress={handleSubmit(handleSignup)} // Call handleSignup on form submission
        fontSize={FONTS.medium}
        loadingMessage={msg}
        loading={loading}
        disabled={errors && !agrred}
      />
    </>
  );
};

export default SignupForm;
