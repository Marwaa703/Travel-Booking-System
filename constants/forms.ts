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
export const companyUserSignupSchema = signupSchema.concat(
  Yup.object().shape({
    role: Yup.string().required("Write your role as in company"),
  }),
);
export const loginInputs: InputFieldProps<SignupFormFields>[] = [
  {
    name: "email",
    icon: "mail",
    autoCapitalize: "none",
    keyboardType: "email-address",
  },
  {
    name: "password",
    icon: "lock-closed",
    autoCapitalize: "none",
  },
];

export const signupInputs: InputFieldProps<SignupFormFields>[] = [
  {
    name: "fullname",
    icon: "person-sharp",
    autoCapitalize: "none",
    keyboardType: "default",
  },
  {
    name: "email",
    icon: "mail",
    autoCapitalize: "none",
    keyboardType: "email-address",
  },
  {
    name: "phone",
    icon: "phone-portrait-outline",
    autoCapitalize: "none",
    keyboardType: "phone-pad",
  },
  {
    name: "password",
    icon: "lock-closed",
    autoCapitalize: "none",
  },
];
export const companyUserSignupInputs: InputFieldProps<UserCompanySignupFormFields>[] =
  [
    ...signupInputs,
    {
      name: "role",
      icon: "briefcase",
      autoCapitalize: "none",
    },
  ];

export interface InputFieldProps<T> {
  name: T;
  icon: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

export type SignupFormFields = "fullname" | "email" | "password" | "phone";

export type UserCompanySignupFormFields = SignupFormFields | "role";
