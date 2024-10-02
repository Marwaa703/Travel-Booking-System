import Padding from "@/components/containers/Padding";
import Spacer from "@/components/Spacer";
import { COLORS, FONTS, SPACING } from "@/constants/theme";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
interface ScreenFormContainerProps {
  title: string;
  subTitle: string;
  topFlex?: number;
}
const ScreenFormContainer = ({
  title,
  subTitle,
  children,
}: PropsWithChildren<ScreenFormContainerProps>) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: SPACING.large,
  },

  header: {
    textAlign: "center",
    alignItems: "center",
    height: "15%",
  },
  title: {
    fontSize: FONTS.xlarge,
  },
  subTitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSubtitle,
  },
});
