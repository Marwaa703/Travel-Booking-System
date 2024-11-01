export interface Company {
  id?: string;
  name: string;
  address: string;
  logo: string;
  wallet: string;
  approved?: boolean;
  status?: CompanyApproveStatus;
  admin_msg?: string | null;
}

export interface CompanyPaper {
  company_id?: string;
  paper_id?: string;
  image_url: string;
  title: string;
}

export interface CompanyUser {
  profile_picture?: string;
  id?: string;
  company_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  birth_date?: string;
  role?: CompanyUserRoles;
  gender?: Gender;
}

export interface CompanyData {
  user: CompanyUser;
  details: Company;
  papers: CompanyPaper[];
}
export type CompanyUserRoles = "Representative" | "Support" | "TourGuide";
export const companyUserRoles: CompanyUserRoles[] = [
  "Representative",
  "Support",
  "TourGuide",
];

export interface NewCompanyUser extends Omit<CompanyUser, "role"> {
  role: CompanySubUserRoles;
}
export type CompanySubUserRoles = "Support" | "TourGuide";

export type Gender = "male" | "female";
export type CompanyApproveStatus = "pending" | "approved" | "rejected";
export const companyApproveStatus: CompanyApproveStatus[] = [
  "pending",
  "approved",
  "rejected",
];
export type CompanyEditSection =
  | "Representative"
  | "Papers"
  | "Details"
  | "Full";
export const companyEditSections: CompanyEditSection[] = [
  "Full",
  "Details",
  "Papers",
  "Representative",
];
