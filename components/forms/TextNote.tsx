import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";
import { FONTS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const TextNote = ({
  note,
  style,
}: {
  note?: string;
  style?: StyleProp<TextStyle>;
}) => {
  // configure styles
  const theme = useTheme();
  return (
    <>
      {note && (
        <Text
          style={[{ fontSize: FONTS.small, color: theme.textSecondary }, style]}
        >
          {note}
        </Text>
      )}
    </>
  );
};

export default TextNote;
