import axios, { AxiosError } from "axios";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://192.168.0.100:3000";
const API_TIMEOUT = parseInt(
  process.env.EXPO_PUBLIC_API_TIMEOUT || "100000000000000000000"
);

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface BankAccount {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  bankName: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<User> => {
    try {
      const response = await api.get(
        `/users?username=${credentials.username}&password=${credentials.password}`
      );
      if (response.data.length === 0) {
        throw new Error("Invalid credentials");
      }
      return response.data[0];
    } catch (error: unknown) {
      console.error("Login API error:", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("Network error - no response received");
        }
      }
      throw error;
    }
  },
};

export const bankAPI = {
  getUserAccounts: async (userId: string): Promise<BankAccount[]> => {
    try {
      const response = await api.get(`/accounts?userId=${userId}`);
      return response.data;
    } catch (error: unknown) {
      console.error("Bank API error:", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("Network error - no response received");
        }
      }
      throw error;
    }
  },
};
