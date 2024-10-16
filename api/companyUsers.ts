import { CompanyUser, NewCompanyUser } from "@/types/company";
import api, { handleError } from "./axiosApi";
const companyUsersApi = {
  //Sign up for companies and companies users
  createUser: async (user: CompanyUser): Promise<CompanyUser> => {
    try {
      // Step 2: Create User with companyId
      const userResponse = await api.post<CompanyUser>("/company/signup", {
        ...user,
      });

      // Prepare the updated company data
      return userResponse.data;
    } catch (error) {
      console.error("Error during signupCompany:", error);
      throw new Error("Failed to sign up company.");
    }
  },
  createNewUser: async (user: NewCompanyUser): Promise<NewCompanyUser> => {
    try {
      // Step 2: Create User with companyId
      const userResponse = await api.post<NewCompanyUser>("/company/signup", {
        ...user,
      });

      // Prepare the updated company data
      return userResponse.data;
    } catch (error) {
      console.error("Error during add new company  user:", error);
      throw new Error("Failed to sign up new company user.");
    }
  },

  // Get all users of a company
  getAllCompaniesUsers: async (): Promise<CompanyUser[]> => {
    try {
      const response = await api.get<CompanyUser[]>("/company/users");
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch company users");
      return []; // Ensure to return an array in case of error
    }
  },

  // Get users by company ID
  getCompanyUsers: async (companyId: string): Promise<CompanyUser[]> => {
    try {
      const response = await api.get<CompanyUser[]>(
        `/company/users/${companyId}`,
      );
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch users for the company");
      return []; // Ensure to return an array in case of error
    }
  },

  // Get a specific user by company ID and user ID
  getCompanyUser: async (
    companyId: string,
    userId: string,
  ): Promise<CompanyUser> => {
    try {
      const response = await api.get<CompanyUser>(
        `/company/users/${companyId}/${userId}`,
      );
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch company user");
      return {} as CompanyUser; // Return an empty object if needed
    }
  },

  // Get a user by user ID
  getUser: async (userId: string): Promise<CompanyUser> => {
    try {
      const response = await api.get<CompanyUser>(`/company/users/${userId}`);
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch user");
      return {} as CompanyUser; // Return an empty object if needed
    }
  },

  // Update a company user
  updateCompanyUser: async (
    userId: string,
    userData: Partial<NewCompanyUser>,
  ): Promise<NewCompanyUser> => {
    try {
      const response = await api.put<NewCompanyUser>(
        `/company/users/${userId}`,
        userData,
      );
      return response.data;
    } catch (error) {
      handleError(error, "Failed to update company user");
      return {} as NewCompanyUser; // Return an empty object if needed
    }
  },

  // Delete a company user
  deleteCompanyUser: async (userId: string): Promise<void> => {
    try {
      await api.delete(`/company/users/${userId}`);
    } catch (error) {
      handleError(error, "Failed to delete company user");
    }
  },
};
export default companyUsersApi;
