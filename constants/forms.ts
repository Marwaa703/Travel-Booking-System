import { KeyboardTypeOptions } from "react-native";
import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{11}$/;

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
  gender: Yup.string().required("Select your gender"),
  phone: Yup.string()
    .matches(phoneRegex, { message: "Invalid phone number format" })
    .required("Select your gender"),
});

export const loginInputs: InputFieldProps[] = [
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
export const signupInputs: InputFieldProps[] = [
  {
    name: "fullname",
    icon: "person-sharp",
    autoCapitalize: "none",
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
  {
    name: "gender",
    icon: "male-female",
    autoCapitalize: "none",
  },
];

export interface InputFieldProps {
  name: string;
  icon: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}
