import axios from "axios";
import { CustomerForm } from "./type";

export const customerApi = {
  // Create customer
  create: async (data: CustomerForm) => {
    const res = await axios.post("/api/proxy", {
      path: "/customer",
      method: "POST",
      data,
    });
    return res.data;
  },

  // Get customer by ID
  getById: async (id: string) => {
    const res = await axios.post("/api/proxy", {
      path: `/customer/${id}`,
      method: "GET",
    });
    return res.data;
  },

  // Update customer
  update: async (id: string, data: any) => {
    const res = await axios.post("/api/proxy", {
      path: `/customer/${id}`,
      method: "PUT",
      data,
    });
    return res.data;
  },

  // Delete customer
  delete: async (id: string) => {
    const res = await axios.post("/api/proxy", {
      path: `/customer/${id}`,
      method: "DELETE",
    });
    return res.data;
  },

  // Get customer by phone number
  getByPhoneNumber: async (phone: string) => {
    const res = await axios.post("/api/proxy", {
      path: `/customer/getCustomerInfoByPhoneNumber`,
      method: "GET",
      params: { phoneNumber: phone },
    });
    return res.data;
  },

  // Listen all customers (polling example)
  listenAll: (callback: (data: any[]) => void) => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.post("/api/proxy", {
          path: `/api/v1/customer/all`,
          method: "GET",
          params: { page: 0, size: 50 },
        });
        callback(res.data);
      } catch (err) {
        console.error("Failed to fetch customers", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  },
};

export const customerAccountApi = {
  // Create customer
  create: async (accountType: "CURRENT" | "SAVING", customerId: string) => {
    console.log({ accountType, customerId });
    const res = await axios.post("/api/proxy", {
      path: "/accountCustomer",
      method: "POST",
      data: {
        accountType,
        customerId,
      },
    });
    return res.data;
  },

  // Get customer by ID
  getAccountsByCustomerId: async (
    id?: string,
    page?: number,
    size?: number
  ) => {
    const res = await axios.post("/api/proxy", {
      path: "/accountCustomer/customer",
      method: "GET",
      params: { id },
    });
    return res.data;
  },

  getAccountBalance: async (accountNumber: string) => {
    const res = await axios.post("/api/proxy", {
      path: "/accountCustomer/getBalance",
      method: "GET",
      params: { accountNumber },
    });
    return res.data;
  },

  depositIntoMainAccountUsingMobileMoney: async (
    userId: string,
    data: {
      phoneNumber: string;
      motif: string;
      amount: number;
      apiUserTransfer: string;
    }
  ) => {
    const res = await axios.post("/api/proxy", {
      path: "/transaction/charge-account-withMobileMoney",
      method: "POST",
      data: { ...data, customerId: userId },
    });
    return res.data;
  },

  withdrawFromMainAccountToMobileMoney: async (
    userId: string,
    data: {
      phoneNumber: string;
      amount: number;
      apiUserTransfer: string;
    }
  ) => {
    const res = await axios.post("/api/proxy", {
      path: "/transaction/charge-mobile-account-from-mansar-account",
      method: "POST",
      data: { ...data, customerId: userId },
    });
    return res.data;
  },
};

export const transactionsApi = {
  transferFromOneAccountToAnother: async (
    description: string,
    data: { fromAccountNumber: string; toAccountNumber: string; amount: number }
  ) => {
    console.log(data);
    const res = await axios.post("/api/proxy", {
      path: "/transaction/transfer-account-to-account",
      method: "POST",
      data: { ...data, currency: "XAF" },
      params: { description, transactionType: "TRANSFER" },
    });
    return res.data;
  },

  getTransactionsByCustomerId: async (
    customerId?: string,
    from?: string,
    to?: string,
    page?: number,
    size?: number
  ) => {
    const res = await axios.post("/api/proxy", {
      path: "/transaction/byCustomer",
      method: "GET",
      params: { customerId, from, to, page, size },
    });
    return res.data;
  },
};
