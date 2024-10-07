import { CompanyPaper } from "@/types/company";
import api, { handleError } from "./axiosApi";
// Get all company papers
export const getAllCompanyPapers = async (): Promise<CompanyPaper[]> => {
  try {
    const response = await api.get<CompanyPaper[]>("/companyPapers");
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch company papers");
    return []; // Ensure to return an array in case of error
  }
};

// Get a company paper by ID
export const getCompanyPaper = async (
  paperId: string,
): Promise<CompanyPaper> => {
  try {
    const response = await api.get<CompanyPaper>(`/companyPapers/${paperId}`);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch company paper");
    return {} as CompanyPaper; // Return an empty object if needed
  }
};

// Create a company paper
export const createCompanyPaper = async (
  paperData: CompanyPaper,
): Promise<CompanyPaper> => {
  try {
    const response = await api.post<CompanyPaper>("/companyPapers", paperData);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to create company paper");
    return {} as CompanyPaper; // Return an empty object if needed
  }
};

// Update a company paper
export const updateCompanyPaper = async (
  paperId: string,
  paperData: CompanyPaper,
): Promise<CompanyPaper> => {
  try {
    const response = await api.put<CompanyPaper>(
      `/companyPapers/${paperId}`,
      paperData,
    );
    return response.data;
  } catch (error) {
    handleError(error, "Failed to update company paper");
    return {} as CompanyPaper; // Return an empty object if needed
  }
};

// Delete a company paper
export const deleteCompanyPaper = async (paperId: string): Promise<void> => {
  try {
    await api.delete(`/companyPapers/${paperId}`);
  } catch (error) {
    handleError(error, "Failed to delete company paper");
  }
};
