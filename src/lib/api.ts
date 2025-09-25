import axios from "axios";
import { CustomerForm } from "./type";

const tokenUrl = process.env.NEXT_PUBLIC_MANSAR_GET_TOKEN_URL;
const baseUrl = process.env.NEXT_PUBLIC_MANSAR_BASE_URL;
const MANSAR_USERNAME = process.env.NEXT_PUBLIC_MANSAR_USERNAME!;
const MANSAR_PASSWORD = process.env.NEXT_PUBLIC_MANSAR_PASSWORD!;
const MANSAR_API_ID = process.env.NEXT_PUBLIC_MANSAR_API_ID!;
const MANSAR_API_KEY = process.env.NEXT_PUBLIC_MANSAR_API_KEY!;

// ================== Auth Helper ==================
let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

async function getToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
    return cachedToken; // use cached token
  }

  const res = await axios.post(`${tokenUrl}`, {
    username: MANSAR_USERNAME,
    password: MANSAR_PASSWORD,
  });

  const token = res.data?.token; // adjust according to API response
  const expiresIn = res.data?.expiresIn || 3600;

  cachedToken = token;
  tokenExpiresAt = now + expiresIn * 1000;

  return token;
}

// ================== Customer API ==================
async function getHeaders() {
  const token = await getToken();
  return {
    Authorization: `Bearer ${token}`,
    apiId: MANSAR_API_ID,
    apiKey: MANSAR_API_KEY,
    "Content-Type": "application/json",
  };
}

export const customerApi = {
  create: async (data: CustomerForm) => {
    const headers = await getHeaders();
    const res = await axios.post(`${baseUrl}/customer`, data, {
      headers,
    });
    return res.data;
  },

  getById: async (id: string) => {
    const headers = await getHeaders();
    const res = await axios.get(`${baseUrl}/customer/${id}`, {
      headers,
    });
    return res.data;
  },

  update: async (id: string, data: any) => {
    const headers = await getHeaders();
    const res = await axios.put(`${baseUrl}/customer/${id}`, data, {
      headers,
    });
    return res.data;
  },

  delete: async (id: string) => {
    const headers = await getHeaders();
    const res = await axios.delete(`${baseUrl}/customer/${id}`, {
      headers,
    });
    return res.data;
  },

  getByPhoneNumber: async (phone: string) => {
    const headers = await getHeaders();
    const res = await axios.get(
      `${baseUrl}/customer/getCustomerInfoByPhoneNumber`,
      {
        headers,
        params: { phoneNumber: phone }, // adjust key according to API
      }
    );
    return res.data;
  },

  listenAll: (callback: (data: any[]) => void) => {
    const interval = setInterval(async () => {
      try {
        const headers = await getHeaders();
        const res = await axios.get(
          `${baseUrl}/api/v1/customer/all?page=0&size=50`,
          {
            headers,
          }
        );
        callback(res.data);
      } catch (err) {
        console.error("Failed to fetch customers", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  },
};
