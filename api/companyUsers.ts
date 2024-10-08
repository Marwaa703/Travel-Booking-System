import { CompanyUser } from "@/types/company";
import api, { handleError } from "./axiosApi";
const companyUsersApi = {
  //Sign up for companies and companies users
  createUser: async (user: CompanyUser): Promise<CompanyUser> => {
    if (user.role !== "Representative") {
      throw new Error(
        "Only users of type 'Representative' can sign up for a company.",
      );
    }

    try {
      // Step 2: Create User with companyId
      const userResponse = await api.post<CompanyUser>("/company/signup", {
        ...user,
      });

      // Prepare the updated company data
      return userResponse.data;
    } catch (error) {
      console.error("Error during signupCompany:", error);
      throw new Error("Failed to sign up company."); // You can handle the error as needed
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
    userData: CompanyUser,
  ): Promise<CompanyUser> => {
    try {
      const response = await api.put<CompanyUser>(
        `/company/users/${userId}`,
        userData,
      );
      return response.data;
    } catch (error) {
      handleError(error, "Failed to update company user");
      return {} as CompanyUser; // Return an empty object if needed
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
