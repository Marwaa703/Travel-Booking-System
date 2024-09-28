import { View } from "react-native";
import React from "react";
import { loginInputs, loginSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { FONTS } from "@/constants/theme";
import AppTextInput from "./AppTextInput";
import LinkButton from "../LinkButton";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data: any) => {
    console.log("lol");
    console.log(JSON.stringify(data));

    // reset
    reset();
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
        <LinkButton to={"/signup"} label="Forget Password" />
      </View>
      <Button
        title="Logind"
        onPress={handleSubmit(handleLogin)}
        fontSize={FONTS.large}
      />
    </>
  );
};

export default LoginForm;
