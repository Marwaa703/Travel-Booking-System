/* eslint-disable react-native/no-unused-styles */
import Padding from "@/components/containers/Padding";
import Spacer from "@/components/Spacer";
import { ColorPalette, COLORS, FONTS, SPACING } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
interface ScreenFormContainerProps {
  title: string;
  subTitle?: string;
  topFlex?: number;
}
const ScreenFormContainer = ({
  title,
  subTitle,
  children,
}: PropsWithChildren<ScreenFormContainerProps>) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return (
    <Padding>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Spacer />
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        <Spacer />
        <View>{children}</View>
      </View>
    </Padding>
  );
};

export default ScreenFormContainer;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginBottom: SPACING.large,
      // backgroundColor: "white",
    },

    header: {
      textAlign: "center",
      alignItems: "center",
      height: "10%",
    },
    title: {
      fontSize: FONTS.xlarge,
    },
    subTitle: {
      fontSize: FONTS.medium,
      color: COLORS.textSubtitle,
    },
  });
