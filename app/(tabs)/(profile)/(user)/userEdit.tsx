/* eslint-disable prettier/prettier */

import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";


const userEdit = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>You can edit your Profile Here......</Text>
    </View>
  );
};

export default userEdit;
