import { CompanyUserRoles } from "@/types/company";

export const captalizeFirstLetter = (text: string) =>
  text.charAt(0).toLocaleUpperCase() + text.slice(1);

export const trimWhitespace = (text: string): string => {
  return text ? text.trim() : "";
};
export const isCompanyUserRole = (role: any): role is CompanyUserRoles => {
  return ["Representative", "Support", "TourGuide"].includes(role);
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
