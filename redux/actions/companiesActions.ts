import { Company, NewCompanyUser } from "@/types/company";
import companyApi from "@/api/company";
import companyUsersApi from "@/api/companyUsers";
import { AppDispatch } from "../store";
import {
  addCompany,
  addCompanyUser,
  editCompany,
  editCompanyUser,
  removeCompanyUser,
  setCompanies,
  setCompanyUsers,
  setError,
  setLoading,
} from "../slices/companiesSlice";

export const fetchCompanies = () => async (dispatch: AppDispatch) => {
  const companies = await companyApi.getAllCompanies();
  dispatch(setCompanies(companies));
  return companies;
};

export const createCompany =
  (companyDetails: Company) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const company = await companyApi.createCompany(companyDetails);
      dispatch(addCompany(company));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateCompanyDetails =
  (payload: Partial<Company>) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const updatedCompany = await companyApi.updateCompany(
        payload.id as string,
        payload,
      );
      dispatch(editCompany(updatedCompany));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteCompany =
  (companyId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      await companyApi.deleteCompany(companyId);
      dispatch(deleteCompany(companyId));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Async actions for company users
export const fetchCompanyUsers =
  (companyId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const users = await companyUsersApi.getCompanyUsers(companyId);
      dispatch(setCompanyUsers(users));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const addNewUser =
  (userData: NewCompanyUser) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const user = await companyUsersApi.createNewUser(userData);
      dispatch(addCompanyUser(user));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };
export const updateCompanyUser =
  (userData: Partial<NewCompanyUser>) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const user = await companyUsersApi.updateCompanyUser(
        userData.id as string,
        userData,
      );
      dispatch(editCompanyUser(user));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };
export const deleteCompanyUser =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      await companyUsersApi.deleteCompanyUser(userId);
      dispatch(removeCompanyUser(userId));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };
