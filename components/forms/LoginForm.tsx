import { Text, View } from "react-native";
import React, { useState } from "react";
import { loginInputs, loginSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { COLORS, FONTS } from "@/constants/theme";
import AppTextInput from "./AppTextInput";
import LinkButton from "../LinkButton";
import { router } from "expo-router";
import { useAppDispatch } from "@/redux/store";
import { addUser } from "@/redux/slices/userSlice";
import ToggleSwitch from "../ToggleSwitch";
import Spacer from "../Spacer";
import { loginFailure, loginSuccess } from "@/redux/slices/authSlice";
import useLoadingState from "@/hooks/useLoadingSate";
import { isCompanyUserRole } from "@/utils";
import { UserTypes } from "@/types/user";
import { login } from "@/api/auth";
import FieldErrorMessage from "./FieldErrorMessage";

const LoginForm = () => {
  const { loading, msg, setLoading, setMsg } = useLoadingState();
  const [error, setError] = useState("");
  const [userType, setUserType] = useState<UserTypes>("User");

  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const companyRoles = ["Representative", "Support", "TourGuide"];

  const handleLogin = async (data: any) => {
    setError("");
    setLoading(true);
    setMsg("Checking user info...");

    try {
      const response = await login(data.email, data.password, userType);

      if (!response.success) {
        setError("Wrong email or password");
      }

      const { token, user } = response.data;

      dispatch(loginSuccess({ token, user, role: user.role }));
      dispatch(addUser(user));

      if (user.role === "User") {
        router.push("/(tabs)/(profile)/(user)/userProfile");
      } else if (user.role === "Admin") {
        router.push("/(tabs)/(profile)/(admin)/adminProfile");
      } else if (companyRoles.includes(user.role)) {
        // Handle company roles as needed
      } else if (isCompanyUserRole(user.role)) {
        router.push("/(tabs)/(profile)/(company)/companyProfile");
      }

      reset();
    } catch (error: any) {
      dispatch(
        loginFailure("Login failed: " + (error.message || "Unknown error")),
      );
      setMsg("Failed to login, try again");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Spacer />
      <ToggleSwitch onToggle={(user) => setUserType(user)} />
      <Spacer />
      {loginInputs.map(({ icon, name, autoCapitalize, keyboardType }) => (
        <AppTextInput
          key={name}
          name={name}
          control={control as unknown as Control<FieldValues>}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          icon={icon}
          error={errors[name]?.message?.toString()}
        />
      ))}
      <FieldErrorMessage error={error} />
      <View style={{ alignSelf: "flex-end", marginVertical: 10 }}>
        <LinkButton to="/forget_password" label="Forget Password" />
      </View>
      <Button
        title="Sign In"
        onPress={handleSubmit(handleLogin)}
        fontSize={FONTS.large}
        loadingMessage={msg}
        loading={loading}
      />
    </>
  );
};

export default LoginForm;
