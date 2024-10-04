/* eslint-disable prettier/prettier */
export interface User {
  firstName: string;
  lastName: string;
  email:string;
  address?: string;
  phone: string;
  birthdate?: Date;
}

export type UserTypes = "Admin" | "Company" | "Anonymous" | "User";
