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
        <Text style={type === 'secondary' ? styles.secondaryText : styles.primaryText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.large,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  primaryText:{
    fontSize:FONTS.large,
    color: COLORS.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    width: 15,
  },
  secondaryText:{
    fontSize:FONTS.medium,
    color: COLORS.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default Button;
