// store/useCustomerStore.ts
import { create } from "zustand";
import { Customer } from "./type";

type CustomerState = {
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
};

export const useCustomerStore = create<CustomerState>((set) => ({
  customer: null,
  setCustomer: (customer) => set({ customer }),
  clearCustomer: () => set({ customer: null }),
}));
