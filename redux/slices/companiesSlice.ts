import { Company } from "@/types/company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompaniesState {
  companies: Company[];
}

const initialState: CompaniesState = {
  companies: [],
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
  },
});

export const { setCompanies, addCompany, removeCompany } =
  companiesSlice.actions;
export default companiesSlice.reducer;
