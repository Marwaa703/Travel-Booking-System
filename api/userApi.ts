import { User } from "@/types/user"; // Make sure to define the User type in your types folder
import api, { handleError } from "./axiosApi";

// User API
const userApi = {
  // Sign up for a new user
  signupUser: async (user: User): Promise<User> => {
    try {
      const response = await api.post<User>("/signup", user);
      return response.data;
    } catch (error) {
      console.error("Error during signupUser:", error);
      throw new Error("Failed to sign up user."); // Handle the error as needed
    }
  },

  // Login a user
  loginUser: async (credentials: {
    email: string;
    password: string;
  }): Promise<User> => {
    try {
      const response = await api.post<User>("/login", credentials);
      return response.data;
    } catch (error) {
      handleError(error, "Failed to log in user");
      return {} as User; // Return an empty object if needed
    }
  },

  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>("/users");
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch users");
      return []; // Ensure to return an array in case of error
    }
  },

  // Get a user by ID
  getUser: async (userId: string): Promise<User> => {
    try {
      const response = await api.get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch user");
      return {} as User; // Return an empty object if needed
    }
  },

  // Update a user
  updateUser: async (userId: string, userData: User): Promise<User> => {
    try {
      const response = await api.put<User>(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      handleError(error, "Failed to update user");
      return {} as User; // Return an empty object if needed
    }
  },

  // Delete a user
  deleteUser: async (userId: string): Promise<void> => {
    try {
      await api.delete(`/users/${userId}`);
    } catch (error) {
      handleError(error, "Failed to delete user");
    }
  },
};

export default userApi;
