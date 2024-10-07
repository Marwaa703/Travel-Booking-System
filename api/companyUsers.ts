import { CompanyUser } from "@/types/company";
import api, { handleError } from "./axiosApi";

// Get all users of a company
export const getAllCompaniesUsers = async (): Promise<CompanyUser[]> => {
  try {
    const response = await api.get<CompanyUser[]>("/company/users");
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch company users");
    return []; // Ensure to return an array in case of error
  }
};

// Get users by company ID
export const getCompanyUsers = async (
  companyId: string,
): Promise<CompanyUser[]> => {
  try {
    const response = await api.get<CompanyUser[]>(
      `/company/users/${companyId}`,
    );
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch users for the company");
    return []; // Ensure to return an array in case of error
  }
};

// Get a specific user by company ID and user ID
export const getCompanyUser = async (
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
};

// Get a user by user ID
export const getUser = async (userId: string): Promise<CompanyUser> => {
  try {
    const response = await api.get<CompanyUser>(`/company/users/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch user");
    return {} as CompanyUser; // Return an empty object if needed
  }
};

// Update a company user
export const updateCompanyUser = async (
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
};

// Delete a company user
export const deleteCompanyUser = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/company/users/${userId}`);
  } catch (error) {
    handleError(error, "Failed to delete company user");
  }
};
