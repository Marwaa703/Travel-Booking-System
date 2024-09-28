/* eslint-disable prettier/prettier */

import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, DimensionValue } from 'react-native';
import { COLORS, FONTS, BORDER_RADIUS } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  fontSize?:number,
  type?: 'primary' | 'secondary';
  width?: DimensionValue | undefined;
  align?: 'flex-start' | 'center' |'flex-end';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, type = 'primary', width="100%" , align,fontSize=FONTS.medium}) => {

  return (
    <View style={[styles.container, { alignItems: align}]}>
      <TouchableOpacity onPress={onPress} style={[styles.button,type === 'secondary' ? styles.secondaryButton : styles.primaryButton, , {width} ] }>
        <Text style={[styles.buttonText,{fontSize}]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical:10

  },
  button: {
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: BORDER_RADIUS.large,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,

  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    // width: 150,
  },
  buttonText: {
    color: COLORS.background,

    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;
