import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CompanyApproveStatus } from "@/types/company";
interface ApprovedStateProps {
  status: CompanyApproveStatus;
}
const CompanyStatus = ({ status }: ApprovedStateProps) => {
  return (
    <Text
      style={[styles.text, { color: status === "approved" ? "green" : "grey" }]}
    >
      {status}
    </Text>
  );
};

export default CompanyStatus;

const styles = StyleSheet.create({
  text: {},
});
