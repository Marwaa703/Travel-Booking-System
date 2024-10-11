import * as Yup from "yup";
import { KeyboardTypeOptions } from "react-native";
import { birthdateSchema, emailRegex, phoneRegex } from "./regext";
import { UserTypes } from "@/types/user";
import { CompanyUserRoles } from "@/types/company";

// Validation Schemas
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, { message: "Invalid Email Address!!" })
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string().min(8).required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First name must be greater than one character?")
    .required("First Name Required"),
  last_name: Yup.string()
    .min(2, "Last name must be greater than one character?")
    .required("Last Name Required"),
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

export const userSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First name must be greater than one character?")
    .required("First Name Required"),
  last_name: Yup.string()
    .min(2, "Last name must be greater than one character?")
    .required("Last Name Required"),
  // address: Yup.string().min(10, "Enter the full address?").optional(),
  phone: Yup.string()
    .matches(phoneRegex, { message: "Invalid phone number format" })
    .max(13, "Max Egyptian number is 13 length, prefixed with +20")
    .required("Enter your phone number"),
  birth_date: birthdateSchema,
});

const tripDateSchema = Yup.date()
  .min(
    new Date(new Date().setDate(new Date().getDate() + 3)),
    "Trip date must be at least 3 days in the future",
  )
  .required("Trip date is required");

export const addTripSchema = Yup.object().shape({
  name: Yup.string().required("Trip Name is required"),
  description: Yup.string().required("Trip details are required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  max_reservations: Yup.number()
    .required("Max Reservations are required")
    .integer("Must be an integer")
    .min(1, "At least 1 reservation is required"),
  date: tripDateSchema,
});

// Company Details Schema
export const companyUserSignupSchema = signupSchema.concat(
  Yup.object().shape({
    role: Yup.string()
      .oneOf(
        ["Representative", "Support", "TourGuide"],
        "Role must be one of: Representative, Support, TourGuide",
      )
      .required("Role is required"),
  }),
);
export const companyDetailsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
  logo: Yup.string()
    .url("Logo must be a valid URL")
    .required("Logo URL is required"),
  wallet: Yup.string()
    .optional()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Wallet must be a valid Ethereum address"),
});

// Company Paper Schema
export const companyPapersSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Title must be at least 4 characters")
    .required("Title is required"),
  imageUrl: Yup.string()
    .url("Image URL must be a valid URL")
    .required("Image URL is required"),
});

// Input Field Props
export interface InputFieldProps<T> {
  name: T;
  icon: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  trim?: boolean; // New trim property
}

// Form Field Types
export type SignupFormFields =
  | "first_name"
  | "last_name"
  | "email"
  | "password"
  | "phone";
export type LoginFormFields = "email" | "password";

export type UserFormFields =
  | "first_name"
  | "last_name"
  // | "address"
  | "phone"
  | "birth_date";
export type AddTripFormFields =
  | "name"
  | "description"
  | "price"
  | "max_reservations"
  | "date";
export type CompanyUserFormFields = SignupFormFields | "role";
export type CompanyDetailsFormFields =
  | "name"
  | "address"
  | "logo"
  | "wallet"
  | "approved";
export type CompanyPapersFormFields = "title" | "imageUrl";

// Input Arrays
export const loginInputs: InputFieldProps<LoginFormFields>[] = [
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
// user EditForm
export const userInputs: InputFieldProps<UserFormFields>[] = [
  {
    name: "first_name",
    icon: "person-sharp",
    autoCapitalize: "words",
    keyboardType: "default",
    trim: true,
  },
  {
    name: "last_name",
    icon: "person-sharp",
    autoCapitalize: "words",
    keyboardType: "default",
    trim: true,
  },
  // {
  //   name: "address",
  //   icon: "home-outline",
  //   autoCapitalize: "none",
  //   keyboardType: "default",
  //   trim: false, // No trimming for address
  // },
  {
    name: "phone",
    icon: "phone-portrait-outline",
    autoCapitalize: "none",
    keyboardType: "phone-pad",
    trim: true,
  },
  {
    name: "birth_date",
    icon: "calendar",
    autoCapitalize: "none",
    keyboardType: "default",
    trim: false, // No trimming for birthdate
  },
];

export const signupInputs: InputFieldProps<SignupFormFields>[] = [
  {
    name: "first_name",
    icon: "person-sharp",
    autoCapitalize: "words",
    keyboardType: "default",
    trim: true,
  },
  {
    name: "last_name",
    icon: "person-sharp",
    autoCapitalize: "words",
    keyboardType: "default",
    trim: true,
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
    name: "description",
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
  {
    name: "date",
    icon: "time-outline",
    keyboardType: "default",
    trim: true,
  },
];

export const companyUserSignupInputs: InputFieldProps<CompanyUserFormFields>[] =
  [
    ...signupInputs,
    {
      name: "role",
      icon: "briefcase",
      autoCapitalize: "none",
      trim: true,
    },
  ];

export const companyDetailsInputs: InputFieldProps<CompanyDetailsFormFields>[] =
  [
    {
      name: "name",
      icon: "business",
      autoCapitalize: "words",
      keyboardType: "default",
      trim: false,
    },
    {
      name: "address",
      icon: "home-outline",
      autoCapitalize: "none",
      keyboardType: "default",
      trim: false,
    },
    {
      name: "logo",
      icon: "image-outline",
      autoCapitalize: "none",
      keyboardType: "default",
      trim: true,
    },
    {
      name: "wallet",
      icon: "wallet",
      autoCapitalize: "none",
      keyboardType: "default",
      trim: true,
    },
  ];

export const companyPapersInputs: InputFieldProps<CompanyPapersFormFields>[] = [
  {
    name: "title",
    icon: "document-text",
    autoCapitalize: "none",
    keyboardType: "default",
    trim: false,
  },
  {
    name: "imageUrl",
    icon: "image-outline",
    autoCapitalize: "none",
    keyboardType: "default",
    trim: true,
  },
];
export const companyRoles: CompanyUserRoles[] = [
  "Representative",
  "Support",
  "TourGuide",
];
