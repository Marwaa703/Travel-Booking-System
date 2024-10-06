/* eslint-disable prettier/prettier */
import { Company, CompanyPaper, CompanyUser } from "@/types/company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CompaniesState {
  companies: Company[];
  papers: CompanyPaper[];
  users: CompanyUser[];
}

const initialState: CompaniesState = {
  companies: [],
  papers: [],
  users: [],
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    // Set the initial list of companies
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },

    // Add a new company to the list
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },

    // Remove a company by its id
    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload,
      );
    },

    // Edit company details
    editCompany: (
      state,
      action: PayloadAction<Partial<Company> & { id: string }>,
    ) => {
      const { id, ...changes } = action.payload;
      const companyIndex = state.companies.findIndex(
        (company) => company.id === id,
      );
      if (companyIndex !== -1) {
        state.companies[companyIndex] = {
          ...state.companies[companyIndex],
          ...changes,
        };
      }
    },

    // Approve a company
    approveCompany: (state, action: PayloadAction<string>) => {
      const companyIndex = state.companies.findIndex(
        (company) => company.id === action.payload,
      );
      if (companyIndex !== -1) {
        state.companies[companyIndex].approved = true;
      }
    },

    // Add a new paper
    addPaper: (state, action: PayloadAction<CompanyPaper>) => {
      state.papers.push(action.payload);
    },
    addPapers: (state, action: PayloadAction<CompanyPaper[]>) => {
      state.papers.concat(action.payload);
    },

    // Update a paper
    updatePaper: (
      state,
      action: PayloadAction<Partial<CompanyPaper> & { paperId: string }>,
    ) => {
      const { paperId, ...changes } = action.payload;
      const paperIndex = state.papers.findIndex(
        (paper) => paper.paperId === paperId,
      );
      if (paperIndex !== -1) {
        state.papers[paperIndex] = {
          ...state.papers[paperIndex],
          ...changes,
        };
      }
    },

    // Remove a paper by its ID
    removePaper: (state, action: PayloadAction<string>) => {
      state.papers = state.papers.filter(
        (paper) => paper.paperId !== action.payload,
      );
    },

    // Add a new user
    addUser: (state, action: PayloadAction<CompanyUser>) => {
      state.users.push(action.payload);
    },

    // Update a user
    updateUser: (
      state,
      action: PayloadAction<Partial<CompanyUser> & { id: string }>,
    ) => {
      const { id, ...changes } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          ...changes,
        };
      }
    },

    // Remove a user by its ID
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const {
  setCompanies,
  addCompany,
  removeCompany,
  editCompany,
  approveCompany,
  addPaper,
  addPapers,
  updatePaper,
  removePaper,
  addUser,
  updateUser,
  removeUser,
} = companiesSlice.actions;

export default companiesSlice.reducer;

// Selectors
export const selectCompanyById = (state: RootState, id: string) =>
  state.companies.companies.find((company: Company) => company.id === id);

export const selectPapersByCompanyId = (state: RootState, companyId: string) =>
  state.companies.papers.filter((paper) => paper.companyId === companyId);

export const selectUsersByCompanyId = (state: RootState, companyId: string) =>
  state.companies.users.filter((user) => user.companyId === companyId);
