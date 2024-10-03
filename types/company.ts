export interface Company {
  id?: string;
  name: string;
  address: string;
  logo: string;
  wallet?: string;
  approved: boolean;
}

export interface CompanyPapers {
  companyId?: string;
  paperId: string;
  imageUrl: string;
}

export interface CompanyUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender;
  birthdate: string;
  phone: string;
  role: CompanyUserRoles;
  companyId?: string;
}

export type CompanyUserRoles = "Representative" | "Support" | "TourGuide";
export type Gender = "male" | "female";
