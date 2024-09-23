/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { COLORS,FONTS,BORDER_RADIUS } from '../constants/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
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
    backgroundColor: COLORS.primary,
    width:250,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: BORDER_RADIUS.large,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PrimaryButton;
