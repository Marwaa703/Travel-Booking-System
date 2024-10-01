import { Location } from "@/constants/types";
import { useMemo } from "react";

export const captalizeFirstLetter = (text: string) =>
  text.charAt(0).toLocaleUpperCase() + text.slice(1);

export const trimWhitespace = (text: string): string => {
  return text ? text.trim() : "";
};
