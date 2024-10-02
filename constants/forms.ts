import { KeyboardTypeOptions } from "react-native";
import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{1,3}?\s?(?:\d{1,3})?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, { message: "Invalid Email Address!!" })
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string().min(8).required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  fullname: Yup.string().required("Full Name Required"),
  email: Yup.string()
    .matches(emailRegex, { message: "Invalid Email Address!!" })
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string().min(8).required("Password is required"),
  phone: Yup.string()
    .matches(phoneRegex, { message: "Invalid phone number format" })
    .max(13, "Max egyptian number is 13 length, Prefixed with +20")
    .required("Enter your phone number"),
});
const birthdateSchema = Yup.date()
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

export const userSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be greater than one character?")
    .required("First Name Required"),
  lastName: Yup.string()
    .min(2, "Last name must be greater than one character?")
    .required("Last Name Required"),
  address: Yup.string().min(10, "Enter the full address?").optional(),
  phone: Yup.string()
    .matches(phoneRegex, { message: "Invalid phone number format" })
    .max(13, "Max Egyptian number is 13 length, prefixed with +20")
    .required("Enter your phone number"),
  birthdate: birthdateSchema,
});

export const companyUserSignupSchema = signupSchema.concat(
  Yup.object().shape({
    role: Yup.string().required("Write your role as in company"),
  }),
);

export const addTripSchema = Yup.object().shape({
  name: Yup.string().required("Trip Name is required"),
  details: Yup.string().required("Trip details are required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  max_reservations: Yup.number()
    .required("Max Reservations are required")
    .integer("Must be an integer")
    .min(1, "At least 1 reservation is required"),
});

// inputs
export const loginInputs: InputFieldProps<SignupFormFields>[] = [
  {
    name: "email",
    icon: "mail",
    autoCapitalize: "none",
    keyboardType: "email-address",
    trim: true,
  },
  {
    name: "password",
    icon: "lock-closed",
    autoCapitalize: "none",
    trim: true,
  },
];

export const userInputs: InputFieldProps<UserFormFields>[] = [
  {
    name: "firstName",
    icon: "person-sharp",
    autoCapitalize: "words",
    keyboardType: "default",
    trim: true,
  },
  {
    name: "lastName",
    icon: "person-sharp",
    autoCapitalize: "words",
    keyboardType: "default",
    trim: true,
  },
  {
    name: "address",
    icon: "home-outline",
    autoCapitalize: "none",
    keyboardType: "default",
    trim: false, // No trimming for address
  },
  {
    name: "phone",
    icon: "phone-portrait-outline",
    autoCapitalize: "none",
    keyboardType: "phone-pad",
    trim: true,
  },
  {
    name: "birthdate",
    icon: "calendar",
    autoCapitalize: "none",
    keyboardType: "default",
    trim: false, // You might want to handle the format in a date picker
  },
];

export const signupInputs: InputFieldProps<SignupFormFields>[] = [
  {
    name: "fullname",
    icon: "person-sharp",
    autoCapitalize: "none",
    keyboardType: "default",
    trim: false, // No trimming for full name
  },
  {
    name: "email",
    icon: "mail",
    autoCapitalize: "none",
    keyboardType: "email-address",
    trim: true,
  },
  {
    name: "phone",
    icon: "phone-portrait-outline",
    autoCapitalize: "none",
    keyboardType: "phone-pad",
    trim: true,
  },
  {
    name: "password",
    icon: "lock-closed",
    autoCapitalize: "none",
    trim: true,
  },
];

export const addTripInputs: InputFieldProps<AddTripFormFields>[] = [
  {
    name: "name",
    icon: "airplane-outline",
    autoCapitalize: "none",
    keyboardType: "default",
    trim: false, // No trimming for name
  },
  {
    name: "details",
    icon: "information-circle-outline",
    autoCapitalize: "none",
    trim: false, // No trimming for details
  },
  {
    name: "price",
    icon: "logo-usd",
    autoCapitalize: "none",
    keyboardType: "phone-pad",
    trim: true,
  },
  {
    name: "max_reservations",
    icon: "bookmarks-outline",
    keyboardType: "phone-pad",
    trim: true,
  },
];

export const companyUserSignupInputs: InputFieldProps<UserCompanySignupFormFields>[] =
  [
    ...signupInputs,
    {
      name: "role",
      icon: "briefcase",
      autoCapitalize: "none",
      trim: true,
    },
  ];

export interface InputFieldProps<T> {
  name: T;
  icon: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  trim?: boolean; // New trim property
}

export type SignupFormFields = "fullname" | "email" | "password" | "phone";
export type AddTripFormFields =
  | "name"
  | "details"
  | "price"
  | "max_reservations";
export type UserCompanySignupFormFields = SignupFormFields | "role";
export type UserFormFields =
  | "firstName"
  | "lastName"
  | "address"
  | "phone"
  | "birthdate";
