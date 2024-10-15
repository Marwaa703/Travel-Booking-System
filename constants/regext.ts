import * as Yup from "yup";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex =
  /^\+?\d{1,3}?\s?(?:\d{1,3})?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;

export const birthdateSchema = Yup.date()
  .max(new Date(), "Birthdate must be in the past")
  .optional()
  .test("age", "You must be at least 18 years old", function (value) {
    if (!value) return false; // If no value, validation fails
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age > 18; // Must be over 18
    }
    return age >= 18; // Allow exact 18th birthday
  });
export const imageUrlPattern = /\.(jpg|jpeg|png)$/i;
