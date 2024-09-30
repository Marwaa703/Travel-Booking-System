import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Control, Controller, FieldValues } from "react-hook-form";
import { captalizeFirstLetter, trimWhitespace } from "@/utils";
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
              // trim={false}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry={name === "password"}
              placeholder={captalizeFirstLetter(name)}
              // style={styles.input}
              {...rest}
            />
            {/* <View style={styles.container}>
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={trim ? trimWhitespace(value) : value}
                placeholder={captalizeFirstLetter(name)}
                style={styles.input}
                secureTextEntry={shown}
                {...rest}
              />
              {icon && name === "password" ? (
                <Pressable onPress={() => setShown(!shown)}>
                  <Ionicons
                    color={COLORS.textSecondary}
                    name={!shown ? "lock-open" : icon}
                    size={16}
                  />
                </Pressable>
              ) : (
                <Ionicons name={icon} size={16} color={COLORS.textSecondary} />
              )}
            </View> */}
          </>
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  // container: {
  //   alignItems: "center",
  //   backgroundColor: COLORS.light,
  //   borderRadius: 25,
  //   paddingVertical: 8,
  //   paddingHorizontal: 14,

  //   marginVertical: 6,
  //   flexDirection: "row",
  //   width: "100%",
  // },

  error: {
    color: "red",
    fontSize: FONTS.small,
    marginTop: 4,
  },
});
