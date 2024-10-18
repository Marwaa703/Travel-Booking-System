import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants/theme";

const TextNote = ({
  note,
  style,
}: {
  note?: string;
  style?: StyleProp<TextStyle>;
}) => {
  return (
    <>
      {note && (
        <Text
          style={[
            { fontSize: FONTS.small, color: COLORS.textSecondary },
            style,
          ]}
        >
          {note}
        </Text>
      )}
    </>
  );
};

export default TextNote;
