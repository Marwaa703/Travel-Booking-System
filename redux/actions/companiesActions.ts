import { createAsyncThunk } from "@reduxjs/toolkit";
import { Company, CompanyUser, CompanyPaper } from "@/types/company";
import companyApi from "@/api/company";
import companyUsersApi from "@/api/companyUsers";
import papersApi from "@/api/companyPapers";

// Async actions for companies
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    const companies = await companyApi.getAllCompanies();
    return companies;
  },
);

export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async (companyDetails: Company) => {
    const company = await companyApi.createCompany(companyDetails);
    return company;
  },
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (payload: Company) => {
    const updatedCompany = await companyApi.updateCompany(
      payload.id as string,
      payload,
    );
    return updatedCompany;
  },
);

export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (companyId: string) => {
    await companyApi.deleteCompany(companyId);
    return companyId;
  },
);

// Async actions for company users
export const fetchCompanyUsers = createAsyncThunk(
  "companies/fetchCompanyUsers",
  async (companyId: string) => {
    const users = await companyUsersApi.getCompanyUsers(companyId);
    return users;
  },
);

export const createUser = createAsyncThunk(
  "companies/createUser",
  async (userData: CompanyUser) => {
    const user = await companyUsersApi.createUser(userData);
    return user;
  },
);

// Async actions for company papers
export const fetchCompanyPapers = createAsyncThunk(
  "companies/fetchCompanyPapers",
  async (companyId: string) => {
    const papers = await papersApi.getCompanyPapers(companyId);
    return papers;
  },
);

export const createPaper = createAsyncThunk(
  "companies/createPaper",
  async (paperData: CompanyPaper) => {
    const paper = await papersApi.createCompanyPaper(paperData);
    return paper;
  },
);
export const createPapers = createAsyncThunk(
  "companies/createPapers",
  async (papersData: CompanyPaper[]) => {
    const createdPapers = await Promise.all(
      papersData.map((paperData) => papersApi.createCompanyPaper(paperData)),
    );
    return createdPapers; // Return the array of created papers
  },
);
