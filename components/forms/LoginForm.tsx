/* eslint-disable prettier/prettier */

import { View } from "react-native";
import React from "react";
import { loginInputs, loginSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { FONTS } from "@/constants/theme";
import AppTextInput from "./AppTextInput";
import LinkButton from "../LinkButton";
import { useNavigation } from "expo-router";
import { useAppDispatch } from "@/redux/store";
import { setUser } from "@/redux/slices/userSlice";

const LoginForm = () => {
  const navigate = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
const dispatch = useAppDispatch();

  const handleLogin = (data: any) => {
    console.log("lol");
// update redux
dispatch(setUser({role:"User",userData:{data}}))
    console.log(JSON.stringify(data));

    // reset
    reset();
    navigate.navigate("(tabs)" as never);
  };
  console.log({ errors });
  return (
    <>
      {loginInputs.map(({ icon, name, autoCapitalize, keyboardType }) => (
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
      <View style={{ alignSelf: "flex-end", marginVertical: 10 }}>
        <LinkButton to={"/forget_password"} label="Forget Password" />
      </View>
      <Button
        title="Sign In"
        onPress={handleSubmit(handleLogin)}
        // onPress={() => navigate.navigate("(tabs)" as never)}
        fontSize={FONTS.large}
      />
    </>
  );
};

export default LoginForm;