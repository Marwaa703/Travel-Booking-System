import { StyleSheet, Text, TextInputProps, View } from "react-native";
import React from "react";
import { FONTS } from "@/constants/theme";
import { Control, Controller, FieldValues } from "react-hook-form";
import { captalizeFirstLetter } from "@/utils";
import TextInputField from "./TextInputField";

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
              secureTextEntry={name === "password"}
              placeholder={captalizeFirstLetter(name)}
              // style={styles.input}
              {...rest}
            />
          </>
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: FONTS.small,
    marginTop: 4,
  },
});
