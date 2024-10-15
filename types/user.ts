export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  // address?: string;
  phone: string;
  birth_date?: Date;
  role: UserTypes;
  profile_picture?: string;
}

export type UserTypes = "Admin" | "Company" | "Anonymous" | "User";
export interface UserWithId extends User {
  id: string;
  role: UserTypes;
}
