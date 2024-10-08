import { View } from "react-native";
import React, { useState } from "react";
import { loginInputs, loginSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { FONTS } from "@/constants/theme";
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
import { UserTypes, UserWithId } from "@/types/user";
import { login } from "@/api/auth";

const LoginForm = () => {
  const { loading, msg, setLoading, setMsg } = useLoadingState();
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

  const companyRoles = ["Representative | Support | TourGuide"];
  const handleLogin = async (data: any) => {
    setLoading(true);
    setMsg("checking user info...");
    console.log({ data });
    try {
      console.log({ userType });
      const response = await login(data.email, data.password, userType);

      console.log({ response });
      if (!response || !response.token || !response.user) {
        throw new Error("Invalid response from server");
      }
      const { token, user } = response;
      // const userWithId: UserWithId = {
      //   id: user.id,
      //   firstName: user.first_name,
      //   lastName: user.last_name,
      //   email: user.email,
      //   phone: user.phone,
      //   role: user.role,
      // };

      dispatch(loginSuccess({ token, user, role: user.role }));
      console.log("Login response:", response);
      dispatch(addUser(user));
      // add token to user
      console.log({ user });
      if (user.role === "User") {
        router.push("/(tabs)/(profile)/(user)/userProfile");
      } else if (user.role === "Admin") {
        router.push("/(tabs)/(profile)/(admin)/adminProfile");
      } else if (companyRoles.includes(user.role)) {
      } else if (isCompanyUserRole(user.role)) {
        router.push("/(tabs)/(profile)/(company)/companyProfile");
      }

      reset();
      console.log(user);

      // console.log(userWithId);
    } catch (error: any) {
      console.error("Login failed:", error.message);
      dispatch(loginFailure("Login failed: " + error.message));
      console.error({ error: error.message });
      setMsg("falied to login, try again");
      setLoading(false);
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
          error={errors["email"]?.message?.toString()}
        />
      ))}
      <View style={{ alignSelf: "flex-end", marginVertical: 10 }}>
        <LinkButton to={"/forget_password"} label="Forget Password" />
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
