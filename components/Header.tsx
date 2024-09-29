/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from "@/constants/theme"; 
import { Ionicons } from '@expo/vector-icons';


interface HeaderProps {
  leftIcon?: string;
  rightIcon?: string;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  leftIcon = "person-circle-outline", 
  rightIcon = "notifications-outline", 
  title = "" 
}) => {
  return (
    <View style={styles.header}>

      <Ionicons name={leftIcon} size={30} color={COLORS.textPrimary} />

      {title ? <Text style={styles.title}>{title}</Text> : null}

      <Ionicons name={rightIcon} size={30} color={COLORS.textPrimary} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 50,
    padding: 13,
    marginBottom: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
});

export default Header;
