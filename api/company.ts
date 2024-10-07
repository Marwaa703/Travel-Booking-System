import { Company } from "@/types/company";
import api, { handleError } from "./axiosApi";

// Get all companies
export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    const response = await api.get<Company[]>("/companies");
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch companies");
    return []; // Ensure to return an array in case of error
  }
};

// Get a company by ID
export const getCompany = async (companyId: string): Promise<Company> => {
  try {
    const response = await api.get<Company>(`/companies/${companyId}`);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch company");
    return {} as Company; // Return an empty object if needed
  }
};

// Update a company
export const updateCompany = async (
  companyId: string,
  companyData: Company,
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
};

// Delete a company
export const deleteCompany = async (companyId: string): Promise<void> => {
  try {
    await api.delete(`/companies/${companyId}`);
  } catch (error) {
    handleError(error, "Failed to delete company");
  }
};
