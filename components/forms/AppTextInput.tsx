import { TextInputProps, View } from "react-native";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { captalizeFirstLetter } from "@/utils";
import TextInputField from "./TextInputField";
import FieldErrorMessage from "./FieldErrorMessage";

interface AppTextInputProps extends TextInputProps {
  icon?: any;
  pass?: boolean;
  error?: string;
  name: string;
  control: Control<FieldValues> | undefined;
  trim?: boolean;
}
const AppTextInput = ({
  control,
  name,
  icon,
  pass = false,
  error,
  trim = true,
  ...rest
}: AppTextInputProps) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInputField
              name={name}
              icon={icon}
              trim={trim}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={captalizeFirstLetter(name)}
              {...rest}
            />
          </>
        )}
      />
      <FieldErrorMessage error={error as string} />
    </View>
  );
};

export default AppTextInput;
