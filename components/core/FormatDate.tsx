import React from "react";
import { Text } from "react-native";

interface FormatDateProps {
  dateString: string;
}

const FormatDate: React.FC<FormatDateProps> = ({ dateString }) => {
  const date = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  return <Text>{formattedDate}</Text>;
};

export default FormatDate;
