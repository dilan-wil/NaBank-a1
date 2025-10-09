export type CustomerForm = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  region: string;
  postalCode: string;
  birthdate: string; // ISO date string, e.g., "2025-09-25"
  idType: "PASSPORT" | "CNI" | "DRIVER_LICENCE" | ""; // adjust as needed
  mobilePhoneNumber: string;
  alternatePhoneNumber?: string;
  emailAddress: string;
  customerSource?: string;
  status: "VALID" | "INVALID" | "PENDING"; // adjust based on API
  customerType: "INDIVIDUAL" | "BUSINESS";
  appProductId: string;
  nui: string;
  nationality: string;
  revenusRange: string;
  cniNumber: string;
  gender: "MALE" | "FEMALE" | "";
};

export type Customer = {
  id: string;
  deleted: boolean;
  deletedOn: string | null;
  created: string;
  updated: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  region: string;
  postalCode: string;
  birthdate: string; // ISO string
  idType: "PASSPORT" | "CNI" | "OTHER";
  mobilePhoneNumber: string;
  alternatePhoneNumber?: string;
  emailAddress: string;
  customerSource?: string;
  status: "VALID" | "INVALID" | "PENDING";
  customerType: "INDIVIDUAL" | "COMPANY";
  applicationProductId: string;
  nui?: string;
  nationality?: string;
  revenusRange?: string;
  cniNumber?: string;
  coreBankingId?: string;
  mapleradId?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  applicationProductDetail?: {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    primaryColor?: string;
    status: boolean;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      phone?: string;
      email?: string;
      avatar?: string;
      roleType?: string; // e.g., "DEV"
      structureName?: string;
      organisationProfileId?: string;
      subscriptionPlanId?: string;
    };
  };
};

type CustomerDetail = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobilePhoneNumber: string;
  status: "VALID" | "INVALID" | string;
  gender: "MALE" | "FEMALE" | string;
  customerAppInUseName: string;
};

export type Account = {
  id: string;
  deleted: boolean;
  deletedOn: string | null;
  created: string;
  updated: string;
  accountNumber: string;
  coreBankingAccountId: string;
  applicationProductId: string;
  status: "OPEN" | "CLOSED" | "PENDING" | string;
  accountType: "CURRENT" | "SAVING" | "FIXED" | string;
  customerId: string;
  signersId: string[];
  signersDetails: any; // can refine later if you have structure
  customerDetail: CustomerDetail;
  balanceDetails: AccountBalanceDetail | null;
};

export type AccountBalanceDetail = {
  currency: string;
  amount: number;
};

export interface Transaction {
  id: string;
  deleted: boolean;
  deletedOn: string | null;
  created: string;
  updated: string;
  amount: number;
  fees: number;
  appFees: number | null;
  customerFromId: string | null;
  customerToId: string | null;
  description: string | null;
  sumar: string | null;
  type: "DEPOSIT" | "WITHDRAWAL" | "RECEIVED_MOBILE" | string;
  status: "PENDING" | "DONE" | "FAILED" | string;
  partnerIdTransaction: string;
  coreBankingTransactionReference: string | null;
  transferTools: "CORE_BANKING" | "OM" | "MTN";
  applicationProductId: string;
  targetSavingId: string | null;
  groupSavingId: string | null;
  fixedSavingId: string | null;
  challengeId: string | null;
  tontineId: string | null;
  investmentProductId: string | null;
  customerFromDetails: CustomerDetail | null;
  customerToDetails: CustomerDetail | null;
}
