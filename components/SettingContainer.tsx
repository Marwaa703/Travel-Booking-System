/* eslint-disable prettier/prettier */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {COLORS} from "../constants/theme";


type SettingCardProps = {
  title: string;
  onPress: () => void;
  leftIconName:any;

};

const SettingCard: React.FC<SettingCardProps> = ({ title, onPress,leftIconName }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      {/* Icon on the left */}
      <MaterialIcons name={leftIconName} size={20} color={COLORS.textSecondary} />

      {/* Title in the middle */}
      <Text style={styles.titleText}>{title}</Text>

      {/* Right arrow icon */}
      <MaterialIcons name="chevron-right" size={20} color={COLORS.textSecondary}  />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.opacity,
    padding: 15,
    borderRadius: 10,
    margin:20
  },
  titleText: {
    flex: 1, // Takes up available space
    marginLeft: 15,
    fontSize: 16,
    color: COLORS.textSecondary, // Text color
  },
});

export default SettingCard;
