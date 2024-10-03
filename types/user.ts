export interface User {
  firstName: string;
  lastName: string;
  address?: string;
  phone: string;
  birthdate?: Date;
}

export type UserTypes = "Admin" | "Company" | "Anonymous" | "User";