import { StyleSheet, Text, View } from "react-native";
import React from "react";
interface ApprovedStateProps {
  approved: boolean;
}
const ApprovedState = ({ approved }: ApprovedStateProps) => {
  const text = approved ? "Approved" : "Pending Approval";
  return (
    <Text style={[styles.text, { color: approved ? "green" : "grey" }]}>
      {text}
    </Text>
  );
};

export default ApprovedState;

const styles = StyleSheet.create({
  text: {},
});
