import { CompanyPaper } from "@/types/company";
import api, { handleError } from "./axiosApi";

const papersApi = {
  // Get all company papers
  getCompanyPapers: async (companyId: string): Promise<CompanyPaper[]> => {
    try {
      const response = await api.get<CompanyPaper[]>(
        `/companyPaper/${companyId}`,
      );
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch company papers");
      return []; // Ensure to return an array in case of error
    }
  },

  // Get a company paper by ID
  getCompanyPaper: async (paperId: string): Promise<CompanyPaper> => {
    try {
      const response = await api.get<CompanyPaper>(`/companyPapers/${paperId}`);
      return response.data;
    } catch (error) {
      handleError(error, "Failed to fetch company paper");
      return {} as CompanyPaper; // Return an empty object if needed
    }
  },

  // Create a company paper
  createCompanyPaper: async (
    paperData: CompanyPaper,
  ): Promise<CompanyPaper> => {
    try {
      const response = await api.post<CompanyPaper>(
        "/companyPapers",
        paperData,
      );
      return response.data;
    } catch (error) {
      handleError(error, "Failed to create company paper");
      return {} as CompanyPaper; // Return an empty object if needed
    }
  },

  // Update a company paper
  updateCompanyPaper: async (
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
  },

  // Delete a company paper
  deleteCompanyPaper: async (paperId: string): Promise<void> => {
    try {
      await api.delete(`/companyPapers/${paperId}`);
    } catch (error) {
      handleError(error, "Failed to delete company paper");
    }
  },
};
export default papersApi;
