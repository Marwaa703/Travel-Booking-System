/* eslint-disable prettier/prettier */
import { View } from "react-native";
import React, { useState } from "react";
import { loginInputs, loginSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { FONTS } from "@/constants/theme";
import AppTextInput from "./AppTextInput";
import LinkButton from "../LinkButton";
import { router} from "expo-router";
import { useAppDispatch } from "@/redux/store";
import { login } from "@/api/auth"; 
import { UserTypes,UserWithId } from "@/types/user"; 
import ToggleSwitch from "../ToggleSwitch";
import Spacer from "../Spacer";
import { loginFailure, loginSuccess } from "@/redux/slices/authSlice";

const LoginForm = () => {
  const [userType, setUserType] = useState<UserTypes>("User")
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const companyRoles=["Representative | Support | TourGuide"];
  const handleLogin = async (data: any) => {
    try {
      const response = await login(data.email, data.password, userType);

      if (!response || !response.token || !response.user) {
        throw new Error("Invalid response from server");
      }
      const { token, user } = response;
      const userWithId: UserWithId = {
        id: user.id, 
        firstName: user.first_name, 
        lastName: user.last_name, 
        email: user.email, 
        phone: user.phone, 
        role: user.role , 
      };
  
      dispatch(loginSuccess({ token, user: userWithId, role: user.role }));
      console.log("Login response:", response);
      if (user.role === "User") {
        router.push("/(tabs)/(profile)/(user)/userProfile");
      } else if (user.role === "Admin") {
        router.push("/(tabs)/(profile)/(admin)/adminProfile");
      } else if (companyRoles.includes(user.role)) { 
        router.push("/(tabs)/(profile)/(company)/companyProfile");
      }
  
      reset();
      console.log(userWithId);
    } catch (error: any) {
      console.error("Login failed:", error.message);
      dispatch(loginFailure("Login failed: " + error.message)); 
    }
  };
  
  console.log({ errors ,userType:userType});

  return (
    <>
    <Spacer />
    <ToggleSwitch  onToggle={(user)=>setUserType(user)} />
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
      />
    </>
  );
};

export default LoginForm;
