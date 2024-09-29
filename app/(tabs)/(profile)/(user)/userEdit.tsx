/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import InputField from '@/components/InputField';
import { COLORS, FONTS } from '@/constants/theme';
import { router } from 'expo-router';

const EditProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={()=>{router.push("userProfile")}}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Picture Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"}}
          style={styles.profileImage}
        />
        <TouchableOpacity>
          <Text style={styles.changeProfileText}>Change Profile Picture</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <InputField
        label="First Name"
        value="Leonardo"
        required
      />
      <InputField
        label="Last Name"
        value="Ahmed"
        required
      />
      <InputField
        label="Location"
        value="Sylhet Bangladesh"
        required
      />
      <InputField
        label="Mobile Number"
        value="+88 01758-000666"
        type="phone"
        required
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop:100
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: FONTS.large,
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  doneText: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.opacity,
  },
  changeProfileText: {
    color: COLORS.secondary,
    marginTop: 20,
    fontSize: FONTS.medium,
  },
});

export default EditProfileScreen;
