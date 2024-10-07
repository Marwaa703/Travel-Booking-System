import { UserTypes } from "@/types/user";
import api from "./axiosApi";
import {
  Company,
  CompanyData,
  CompanyPaper,
  CompanyUser,
} from "@/types/company";

// Sign up for Normal users
export const signup = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: UserTypes;
}) => {
  try {
    if (userData.role !== "User") {
      throw new Error("Only users of type 'User' can sign up.");
    }
    const res = await api.post("/signup", userData);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Signup failed";
      console.error("Signup failed with server response:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Signup failed with error:", error.message);
      throw new Error(error.message || "Signup failed");
    }
  }
};

// Login for users
export const login = async (
  email: string,
  password: string,
  userType: UserTypes,
) => {
  try {
    const loginEndpoint = userType === "Company" ? "/company/login" : "/login";
    const response = await api.post(loginEndpoint, {
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Login failed";
      console.error("Login failed with server response:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Login failed with error:", error.message);
      throw new Error(error.message || "Login failed");
    }
  }
};

//Sign up for companies and companies users
export const signupCompany = async (
  companyData: CompanyData,
): Promise<{ user: CompanyUser; details: Company; papers: CompanyPaper[] }> => {
  const { details, papers, user } = companyData;

  if (user.role !== "Representative") {
    throw new Error(
      "Only users of type 'Representative' can sign up for a company.",
    );
  }

  try {
    // Step 1: Create Company
    const companyResponse = await api.post<Company>("/companies", details);
    const companyId = companyResponse.data.id; // Assuming the company ID is in the response data

    // Step 2: Create User with companyId
    const userResponse = await api.post<CompanyUser>("/company/signup", {
      ...user,
      companyId,
    });

    // Step 3: Create Company Papers with companyId
    const papersResponse = await Promise.all(
      papers.map((paper) =>
        api.post<CompanyPaper>("/companyPapers", {
          ...paper,
          companyId,
        }),
      ),
    );

    // Prepare the updated company data
    return {
      user: userResponse.data,
      details: companyResponse.data,
      papers: papersResponse.map((response) => response.data), // Extract data from each response
    };
  } catch (error) {
    console.error("Error during signupCompany:", error);
    throw new Error("Failed to sign up company."); // You can handle the error as needed
  }
};
