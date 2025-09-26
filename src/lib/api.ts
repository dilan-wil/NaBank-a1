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
