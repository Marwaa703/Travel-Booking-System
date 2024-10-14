import { Text, TextInputProps, View } from "react-native";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { captalizeFirstLetter } from "@/utils";
import TextInputField from "./TextInputField";
import FieldErrorMessage from "./FieldErrorMessage";
import { COLORS, FONTS } from "@/constants/theme";
import Spacer from "../Spacer";
import TextNote from "./TextNote";

interface AppTextInputProps extends TextInputProps {
  icon?: any;
  pass?: boolean;
  error?: string;
  name: string;
  note?: string;
  control: Control<FieldValues> | undefined;
  trim?: boolean;
}
const AppTextInput = ({
  control,
  name,
  note,
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
      <TextNote note={note} />
      <FieldErrorMessage error={error as string} />
      <Spacer />
    </View>
  );
};

export default AppTextInput;
