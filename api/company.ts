import { Company } from "@/types/company";
import api, { handleError } from "./axiosApi";

// Get all companies
const companyApi = {
  //Sign up for companies and companies users
  createCompany: async (company: Company): Promise<Company> => {
    try {
      // Step 1: Create Company
      const companyResponse = await api.post<Company>("/companies", company);

      // Prepare the updated company data
      return companyResponse.data;
    } catch (error) {
      console.error("Error during signupCompany:", error);
      throw new Error("Failed to sign up company."); // You can handle the error as needed
    }
  },

  getAllCompanies: async (): Promise<Company[]> => {
    try {
      const response = await api.get<Company[]>("/companies");
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch companies");
      return []; // Ensure to return an array in case of error
    }
  },

  // Get a company by ID
  getCompany: async (companyId: string): Promise<Company> => {
    try {
      const response = await api.get<Company>(`/companies/${companyId}`);
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch company");
      return {} as Company; // Return an empty object if needed
    }
  },

  // Update a company
  updateCompany: async (
    companyId: string,
    companyData: Partial<Company>,
  ): Promise<Company> => {
    try {
      const response = await api.put<Company>(
        `/companies/${companyId}`,
        companyData,
      );
      return response.data;
    } catch (error) {
      handleError(error, "Failed to update company");
      return {} as Company; // Return an empty object if needed
    }
  },

  // Delete a company
  deleteCompany: async (companyId: string): Promise<void> => {
    try {
      await api.delete(`/companies/${companyId}`);
    } catch (error) {
      handleError(error, "Failed to delete company");
    }
  },
};
export default companyApi;
