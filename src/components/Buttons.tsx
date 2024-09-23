/* eslint-disable prettier/prettier */

import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { COLORS, FONTS, BORDER_RADIUS } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, type = 'primary' }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[styles.button, type === 'secondary' ? styles.secondaryButton : styles.primaryButton]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  button: {
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: BORDER_RADIUS.large,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    width: 150,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONTS.large,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;
