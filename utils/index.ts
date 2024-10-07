import { CompanyUserRoles } from "@/types/company";

export const captalizeFirstLetter = (text: string) =>
  text.charAt(0).toLocaleUpperCase() + text.slice(1);

export const trimWhitespace = (text: string): string => {
  return text ? text.trim() : "";
};
export const isCompanyUserRole = (role: any): role is CompanyUserRoles => {
  return ["Representative", "Support", "TourGuide"].includes(role);
};
