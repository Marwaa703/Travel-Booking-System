/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from "@/constants/theme"; 
import { Ionicons } from '@expo/vector-icons';



const Header: React.FC = () => {
  return (
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Ionicons name="person-circle-outline" size={30} color={COLORS.primary} />
            <Ionicons name="notifications-outline" size={30} color={COLORS.primary} />
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: '#fff',
      padding: 13,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginVertical: 50,
    },
  });

export default Header;
