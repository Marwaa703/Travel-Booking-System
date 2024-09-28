/* eslint-disable prettier/prettier */

import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, DimensionValue } from 'react-native';
import { COLORS, FONTS, BORDER_RADIUS } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
  width: DimensionValue | undefined;
  align?: 'flex-start' | 'center' |'flex-end';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, type = 'primary', width , align}) => {

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
    margin: 10,
    justifyContent: 'center',

  },
  button: {
    // width: width,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    // width: 150,
  },
  secondaryText:{
    fontSize:FONTS.small,
    color: COLORS.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default Button;
