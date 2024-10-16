import { RootState } from "../store";
import { Company, CompanyUser, NewCompanyUser } from "@/types/company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompaniesState {
  companies: Company[];
  users: CompanyUser[]; //will be used for COmpany role signed in
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  users: [],
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    setCompanyUsers: (state, action: PayloadAction<CompanyUser[]>) => {
      state.users = action.payload;
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },
    addCompanyUser: (
      state,
      action: PayloadAction<CompanyUser | NewCompanyUser>,
    ) => {
      // check if user is already registered
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index === -1) state.users.push(action.payload);
    },
    editCompanyUser: (
      state,
      action: PayloadAction<Partial<CompanyUser | NewCompanyUser>>,
    ) => {
      // check if user is already registered
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index === -1)
        state.users[index] = { ...state.users[index], ...action.payload };
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload,
      );
    },
    removeCompanyUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editCompany: (state, action: PayloadAction<Partial<Company>>) => {
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setCompanies,
  addCompany,
  removeCompany,
  editCompany,
  addCompanyUser,
  removeCompanyUser,
  setCompanyUsers,
  editCompanyUser,
  setError,
  setLoading,
} = companiesSlice.actions;
export default companiesSlice.reducer;

// Selectors
export const selectCompanyById = (state: RootState, id: string) =>
  state.companies.companies.find((company) => company.id === id);

export const selectUsersByCompanyId = (state: RootState, companyId: string) =>
  state.companies.users.filter((user) => user.company_id === companyId);
