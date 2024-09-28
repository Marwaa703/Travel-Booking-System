/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet} from 'react-native';
import { COLORS } from "@/constants/theme"; 
import { Ionicons } from '@expo/vector-icons';



const Header: React.FC = () => {
  return (
 
          <View style={styles.header}>
            <Ionicons name="person-circle-outline" size={30} color={COLORS.primary} />
            <Ionicons name="notifications-outline" size={30} color={COLORS.primary} />
          </View>
 
  );
};

const styles = StyleSheet.create({

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 50,
      // backgroundColor: '#fff',
      padding: 13,
      marginBottom:1,
    },
  });

export default Header;
