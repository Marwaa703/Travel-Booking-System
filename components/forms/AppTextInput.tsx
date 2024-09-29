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

interface AppTextInputProps extends TextInputProps {
  icon?: any;
  pass?: boolean;
  error?: string;
  name: string;
  control: Control<FieldValues> | undefined;
}
const AppTextInput = ({
  control,
  name,
  icon,
  pass = false,
  error,
  ...rest
}: AppTextInputProps) => {
  const [shown, setShown] = useState(true);

  return (
    <View>
      <View style={styles.container}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={name !== "fullname" ? trimWhitespace(value) : value}
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
            </>
          )}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.light,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 14,

    marginVertical: 6,
    flexDirection: "row",
    width: "100%",
  },
  input: {
    fontSize: FONTS.small,
    width: "95%",
  },
  error: {
    color: "red",
    fontSize: FONTS.small,
    marginTop: 4,
  },
});
