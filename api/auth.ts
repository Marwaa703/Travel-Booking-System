/* eslint-disable prettier/prettier */
import axios from "axios";
import { UserTypes } from "@/types/user";

const API_URL = "http://192.168.1.4:3002/voyage/signup"; 

export const signup = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: UserTypes; 
}) => {
  if (userData.role !== "User") {
    throw new Error("Only users of type 'User' can sign up.");
  }

  const response = await axios.post(API_URL, userData);
  return response.data; 
};

export const login = async (email: string, password: string) => {
  const response = await axios.post("http://192.168.1.4:3002/voyage/login", {
    email,
    password,
  });
  return response.data; 
};
