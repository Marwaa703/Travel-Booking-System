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
export function hashTextPercent(
  inputString: string,
  hashChar: string = "*",
  percentage: number = 70,
): string {
  if (percentage < 0 || percentage > 100) {
    console.log("percentage must be between 0 and 100");
    return inputString;
  }
  // Calculate the index for the last 70%
  const length = inputString.length;
  const cutIndex = Math.floor(length * (1 - percentage / 100)); // The index to start hashing from

  if (length === 0) {
    return ""; // Return an empty string for empty input
  }

  // Create the hashed part and keep the first 30%
  const hashedPart = hashChar.repeat(length - cutIndex);
  return inputString.slice(0, cutIndex) + hashedPart;
}

export const formattedDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
