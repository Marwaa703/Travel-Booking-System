import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/constants/theme";
import { captalizeFirstLetter, trimWhitespace } from "@/utils";
import Spacer from "../Spacer";

interface TextInputFieldProps extends TextInputProps {
  icon?: string;
  name: string;
  trim?: boolean;

  onChangeText: (value: string) => void;
  onBlur:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  value: string;
}

const TextInputField = ({
  icon,
  name,
  trim = true,
  onChangeText,
  onBlur,
  value,
  ...rest
}: TextInputFieldProps) => {
  const [shown, setShown] = useState(name === "password" ? true : false);
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={trim ? trimWhitespace(value) : value}
        placeholder={captalizeFirstLetter(name)}
        style={styles.input}
        // note :show password is handled here only
        secureTextEntry={shown}
        {...rest}
      />
      {icon && name === "password" ? (
        <Pressable onPress={() => setShown(!shown)}>
          <Ionicons
            color={COLORS.textSecondary}
            name={!shown ? "lock-open" : (icon as never)}
            size={16}
          />
        </Pressable>
      ) : (
        <Ionicons name={icon as never} size={16} color={COLORS.textSecondary} />
      )}
    </View>
  );
};

export default TextInputField;

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
});
