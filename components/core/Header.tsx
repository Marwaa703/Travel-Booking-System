import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/theme";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

interface HeaderProps {
  leftIcon?: string;
  rightIcon?: string;
  title?: string;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  leftIcon = "person-circle-outline",
  rightIcon = "",
  title = "",
  onLeftIconPress,
  onRightIconPress,
}) => {
  const defaultLeftIconPress = () => router.push("/profile");
  const defaultRightIconPress = () => router.push("/notification");

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onLeftIconPress || defaultLeftIconPress}>
        <Ionicons
          name={leftIcon as never}
          size={30}
          color={COLORS.textPrimary}
        />
      </TouchableOpacity>

      {title ? <Text style={styles.title}>{title}</Text> : null}

      <TouchableOpacity onPress={onRightIconPress || defaultRightIconPress}>
        <Ionicons
          name={rightIcon as never}
          size={30}
          color={COLORS.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 18,
    padding: 16,
    marginBottom: -2,
    backgroundColor: COLORS.bg,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
});

export default Header;
