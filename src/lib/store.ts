// store/useCustomerStore.ts
import { create } from "zustand";
import { Account, Customer } from "./type";

type CustomerState = {
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  accounts: Account[] | null;
  setAccounts: (accounts: Account[]) => void;
};

export const useCustomerStore = create<CustomerState>((set) => ({
  customer: null,
  setCustomer: (customer) => set({ customer }),
  clearCustomer: () => set({ customer: null }),
  accounts: null,
  setAccounts: (accounts) => set({ accounts }),
}));
