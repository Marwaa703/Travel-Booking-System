/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

interface TextFieldProps extends TextInputProps {
  label: string;
  type?: 'text' | 'email' | 'phone';
  required?: boolean;
}

const InputField: React.FC<TextFieldProps> = ({ label, type = 'text', required = false, ...props }) => {
  const [error, setError] = useState('');

  const validateInput = (value: string) => {
    if (required && !value) {
      setError(`${label} is required.`);
      return false;
    }

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('Please enter a valid email address.');
        return false;
      }
    }

    if (type === 'phone') {
      const phoneRegex = /^[0-9]{11}$/;
      if (!phoneRegex.test(value)) {
        setError('Please enter a valid phone number.');
        return false;
      }
    }

    setError(''); // Clear error if validation passes
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.textSecondary}
        onChangeText={(value) => {
          validateInput(value);
        }}
        {...props}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginTop: 16,
    marginHorizontal: 40,
    width: 250,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: FONTS.medium,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F7',
    borderWidth: 1,
    borderColor: COLORS.opacity,
    padding: 10,
    borderRadius: 20,
    fontSize: FONTS.medium,
    color: COLORS.textPrimary,
    width:Dimensions.get("screen").width *0.7
  },
  error: {
    color: 'red',
    fontSize: FONTS.small,
    marginTop: 4,
  },
});

export default InputField;
