/* eslint-disable prettier/prettier */

import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { COLORS,FONTS } from '../constants/theme';

interface TextFieldProps extends TextInputProps {
  label: string;
}

const InputField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label} : </Text>

      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.textSecondary}
        {...props}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginTop: 16,
    marginHorizontal:40,
    width:250
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: FONTS.medium,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#F5F5F7",
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    padding: 10,
    borderRadius: 50,
    fontSize: FONTS.medium,
    color: COLORS.textPrimary,
  },
});

export default InputField;
