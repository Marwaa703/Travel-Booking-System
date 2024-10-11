import { User, UserTypes } from "@/types/user";
import api from "./axiosApi";
import {
  Company,
  CompanyData,
  CompanyPaper,
  CompanyUser,
} from "@/types/company";
import {
  Location,
  Trip,
  TripDetailes,
  TripFormData,
  TripImage,
} from "@/types/trip";
import { localeData } from "moment";

// Sign up for Normal users
export const signup = async (userData: User) => {
  if (userData.role !== "User") {
    return { success: false, error: "Only users of type 'User' can sign up." };
  }

  try {
    console.log("step 1 creating user");
    const res = await api.post("/signup", userData);
    console.log("end of signup");
    return { success: true, data: res.data };
  } catch (error: any) {
    console.log(JSON.stringify(error));
    console.error("Signup failed with server response:");
    return { success: false, error };
  } finally {
    console.log("no errors");
  }
};

// Login for users
export const login = async (
  email: string,
  password: string,
  userType: UserTypes,
) => {
  const loginEndpoint = userType === "Company" ? "/company/login" : "/login";
  console.log({ loginEndpoint });

  try {
    const response = await api.post(loginEndpoint, {
      email,
      password,
    });
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.statusText ||
      "Login failed";
    console.error("Login failed with server response:", errorMessage, {
      error,
    });
    return { success: false, error: errorMessage };
  }
};

// Sign up for companies and company users
export const signupCompany = async (
  companyData: CompanyData,
): Promise<{
  success: boolean;
  user?: CompanyUser;
  details?: Company;
  papers?: CompanyPaper[];
  error?: string;
}> => {
  const { details, papers, user } = companyData;

  if (user.role !== "Representative") {
    return {
      success: false,
      error: "Only users of type 'Representative' can sign up for a company.",
    };
  }

  try {
    // Step 1: Create Company
    const companyResponse = await api.post<Company>("/companies", details);
    const companyId = companyResponse.data.id; // Assuming the company ID is in the response data
    console.log("step 1", companyResponse?.data);

    // Step 2: Create User with companyId
    const userResponse = await api.post<CompanyUser>("/company/signup", {
      ...user,
      company_id: companyId as string,
    });
    console.log("step 2", userResponse?.data);

    // Step 3: Create Company Papers with companyId
    const papersResponse = await Promise.all(
      papers.map((paper) =>
        api.post<CompanyPaper>("/companyPapers", {
          ...paper,
          company_id: companyId as string,
        }),
      ),
    );
    console.log("step 3", papersResponse[0].data);

    // Prepare the updated company data
    return {
      success: true,
      user: userResponse.data,
      details: companyResponse.data,
      papers: papersResponse.map((response) => response.data), // Extract data from each response
    };
  } catch (error) {
    console.error("Error during signupCompany:", error);
    return { success: false, error: "Failed to sign up company." };
  }
};

// Create trip
export const createTrip = async (
  trip: TripFormData,
  companyId: string,
): Promise<{
  success: boolean;
  details?: TripDetailes;
  locations?: Location[];
  images?: TripImage[];
  error?: string;
}> => {
  const { images, locations, details } = trip;

  console.log({ companyId });
  try {
    // Step 1: Create the trip details
    const tripDetailes = await api.post<TripDetailes>("/trips", {
      ...details,
      company_id: companyId,
    });
    const trip_id = tripDetailes.data.id;
    console.log("step 1 done:", trip_id, tripDetailes.data);
    console.log({ locations });
    // Step 2: Create trip locations
    const loactionsData = locations.map((loc) =>
      api.post<Location>("/tripLocations", {
        ...loc,
        trip_id,
      }),
    );
    const tripLocations = await Promise.all(loactionsData);
    console.log("step 2 done:");

    // Step 3: Create trip images
    const imagesData = images.map((img) =>
      api.post<TripImage>("/tripImages", {
        image_url: img.image_url,
        caption: img.caption,
        trip_id,
      }),
    );
    const tripImages = await Promise.all(imagesData);
    console.log({ step3forimages: tripImages.map((i) => i.status) });

    // Prepare the updated trip data
    return {
      success: true,
      details: tripDetailes.data,
      locations: tripLocations.map((response) => response.data), // Extract data from each response
      images: tripImages.map((response) => response.data), // Extract data from each response
    };
  } catch (error) {
    console.error("Error during create:", error);
    return { success: false, error: "Failed to create trip." };
  }
};
