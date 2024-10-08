import { RootState } from "../store";
import { Company, CompanyPaper, CompanyUser } from "@/types/company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "@/redux/actions/companiesActions"; // Adjust the path as needed

interface CompaniesState {
  companies: Company[];
  papers: CompanyPaper[];
  users: CompanyUser[];
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  papers: [],
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
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload,
      );
    },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(actions.fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch companies";
      })
      .addCase(actions.createCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      .addCase(actions.updateCompany.fulfilled, (state, action) => {
        const index = state.companies.findIndex(
          (company) => company.id === action.payload.id,
        );
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })
      .addCase(actions.deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter(
          (company) => company.id !== action.payload,
        );
      })
      .addCase(actions.fetchCompanyPapers.fulfilled, (state, action) => {
        state.papers = action.payload;
      })
      .addCase(actions.createPaper.fulfilled, (state, action) => {
        state.papers.push(action.payload);
      })
      // Handle createUser
      .addCase(actions.createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); // Add new user to the state
      })
      .addCase(actions.createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create user";
      })
      .addCase(actions.fetchCompanyUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.fetchCompanyUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(actions.fetchCompanyUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch companies";
      });
  },
});

// Export actions and reducer
export const { setCompanies, addCompany, removeCompany, editCompany } =
  companiesSlice.actions;
export default companiesSlice.reducer;

// Selectors
export const selectCompanyById = (state: RootState, id: string) =>
  state.companies.companies.find((company) => company.id === id);

export const selectPapersByCompanyId = (state: RootState, companyId: string) =>
  state.companies.papers.filter((paper) => paper.company_id === companyId);

export const selectUsersByCompanyId = (state: RootState, companyId: string) =>
  state.companies.users.filter((user) => user.company_id === companyId);
