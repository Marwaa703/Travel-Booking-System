/* eslint-disable react-native/no-unused-styles */
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import ScreenWraper from "@/components/containers/ScreenWraper";
import Spacer from "@/components/Spacer";
import Padding from "@/components/containers/Padding";
import { ColorPalette, COLORS, dark, FONTS, light } from "@/constants/theme";
import ToggleSwitch from "@/components/forms/FullToggleSwitch";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTheme } from "@/redux/slices/themeSlice";
import { useTheme } from "@/hooks/useTheme";
let c = "";
const Settings = () => {
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector((state) => state.theme.color);
  c = themeColor;
  // const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleSwitch = (color: "light" | "dark") => {
    dispatch(setTheme(color));
  };
  const theme = useTheme();

  console.log({ themeColor });

  return (
    <View style={styles(theme).main}>
      <Padding>
        <Spacer height={36} />
        <View style={styles(theme).container}>
          <View
            style={[
              styles(theme).section,
              { backgroundColor: "transparent", elevation: 0, padding: 0 },
            ]}
          >
            <Text style={styles(theme).sectionHeader}>Preferences</Text>
          </View>

          <View style={styles(theme).section}>
            <View style={styles(theme).row}>
              <Text style={styles(theme).key}>Theme</Text>
              <View>
                <ToggleSwitch
                  onToggle={(value) => toggleSwitch(value)}
                  options={["dark", "light"]}
                  selectedOption="light"
                />
              </View>
            </View>
          </View>
          {/* <View style={styles(theme).section}>
            <View style={styles(theme).row}>
              <Text style={styles(theme).key}>Notifications</Text>
              <View>
                <ToggleSwitch
                  onToggle={(value) => console.log({ value })}
                  options={["hourly", "daily", "weekly"]}
                  selectedOption="daily"
                />
              </View>
            </View>
          </View> */}
        </View>
      </Padding>
      {/* </ScreenWraper> */}
    </View>
  );
};

export default Settings;

const styles = (COLORS: ColorPalette) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: COLORS.bg,
    },
    container: {
      flex: 1,
      // justifyContent: "space-evenly",
      alignItems: "center",
      rowGap: 16,
      elevation: 10,
      shadowOffset: { height: 0, width: 1 },
      paddingBottom: 180,
    },
    section: {
      width: "100%",
      padding: 8,
      backgroundColor: COLORS.bg_surface,
      color: COLORS.textPrimary,
      borderRadius: 0, // Optional: Add border radius for smoother corners
      elevation: 3, // For Android
      shadowColor: COLORS.textPrimary, // For iOS
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    sectionHeader: {
      fontSize: FONTS.large,
      color: COLORS.textPrimary,
    },
    key: {
      fontSize: FONTS.normal,
      color: COLORS.textPrimary,
    },
  });
