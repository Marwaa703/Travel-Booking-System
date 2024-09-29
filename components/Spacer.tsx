import { DimensionValue, View } from "react-native";
import React from "react";
interface SpacerProps {
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
}
const Spacer = ({ height = 12, width = "100%" }: SpacerProps) => {
  return <View style={{ width, height }}></View>;
};

export default Spacer;
