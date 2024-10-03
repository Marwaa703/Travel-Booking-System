/* eslint-disable prettier/prettier */
import { Company } from "@/types/company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CompaniesState {
  list: Company[];
}

const initialState: CompaniesState = {
  list: [],
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    // Set the initial list of companies
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.list = action.payload;
    },

    // Add a new company to the list
    addCompany: (state, action: PayloadAction<Company>) => {
      state.list.push(action.payload);
    },

    // Remove a company by its id
    removeCompany: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (company) => company.id !== action.payload,
      );
    },

    // Edit company details like name, logo, address, etc.
    editCompany: (
      state,
      action: PayloadAction<Partial<Company> & { id: string }>,
    ) => {
      const { id, ...changes } = action.payload;
      const companyIndex = state.list.findIndex((company) => company.id === id);
      if (companyIndex !== -1) {
        state.list[companyIndex] = {
          ...state.list[companyIndex],
          ...changes,
        };
      }
    },

    // Approve a company by setting an isApproved field (assuming it's part of the model)
    approveCompany: (state, action: PayloadAction<string>) => {
      const companyIndex = state.list.findIndex(
        (company) => company.id === action.payload,
      );
      if (companyIndex !== -1) {
        state.list[companyIndex].approved = true;
      }
    },
  },
});

export const {
  setCompanies,
  addCompany,
  removeCompany,
  editCompany,
  approveCompany,
} = companiesSlice.actions;

export default companiesSlice.reducer;

// selectors

export const selectCompanyById = (state: RootState, id: string) =>
  state.companies.list.find((company: Company) => company.id === id);
