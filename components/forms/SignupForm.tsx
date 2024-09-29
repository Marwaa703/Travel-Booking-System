/* eslint-disable prettier/prettier */

import React from "react";
import { signupInputs, signupSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { FONTS } from "@/constants/theme";
import AppTextInput from "./AppTextInput";

const SignupForm = () => {
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
    reset();
  };
  console.log({ errors });
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
          error={errors["email"]?.message?.toString()}
        />
      ))}
      <Button
        title="Sign Up"
        onPress={handleSubmit(handleSignup)}
        fontSize={FONTS.large}
      />
    </>
  );
};

export default SignupForm;
