import axios, { AxiosError } from "axios";
import { User, UserResponse } from "@/types/user";
import { config } from "./config";

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export class AuthClient {
  private static instance: AuthClient;
  private baseUrl = config.api.baseUrl;

  public static getInstance(): AuthClient {
    if (!AuthClient.instance) {
      AuthClient.instance = new AuthClient();
    }
    return AuthClient.instance;
  }

  async login(
    username: string,
    password: string
  ): Promise<{ user: User; tokens: LoginResponse }> {
    try {
      // Step 1: Login and get tokens
      const loginResponse = await axios.post(`${this.baseUrl}/Auth/login`, {
        username,
        password,
      });

      const { token, refreshToken } = loginResponse.data.data;

      if (!token) {
        throw new Error("Login failed - token not returned");
      }

      // Step 2: Get user data
      const userResponse = await axios.get<UserResponse>(
        `${this.baseUrl}/User`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = userResponse.data.data;

      return {
        user: userData,
        tokens: { token, refreshToken },
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ messages?: string }>;
      const message = axiosError?.response?.data?.messages || "Login failed";
      throw new Error(message);
    }
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/Auth/refresh-token`, {
        refreshToken,
      });
      return response.data.data;
    } catch {
      throw new Error("Token refresh failed");
    }
  }

  // Local storage helpers
  saveAuthData(user: User, tokens: LoginResponse) {
    localStorage.setItem("auth_user", JSON.stringify(user));
    localStorage.setItem("auth_tokens", JSON.stringify(tokens));
  }

  getAuthData(): { user: User; tokens: LoginResponse } | null {
    try {
      const user = localStorage.getItem("auth_user");
      const tokens = localStorage.getItem("auth_tokens");

      if (user && tokens) {
        return {
          user: JSON.parse(user),
          tokens: JSON.parse(tokens),
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  clearAuthData() {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_tokens");
  }
}

export const authClient = AuthClient.getInstance();
