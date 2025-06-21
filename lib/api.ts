import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { ValidationError } from "@/types/error";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const authData = authClient.getAuthData();
    console.log("Auth data:", authData); // Auth data'yı konsola yazdırıyoruz
    if (authData?.tokens?.token) {
      request.headers.Authorization = `Bearer ${authData.tokens.token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;
      const data = error?.response?.data;

      console.log("API Error:", data);

      if (status === 400 && data?.errors) {
        const validationError: ValidationError = {
          type: "ValidationError",
          errors: data.errors,
        };
        return Promise.reject(validationError);
      }

      // Handle token refresh for 401 errors + redirect
      if (status === 401) {
        const authData = authClient.getAuthData();
        if (authData?.tokens?.refreshToken) {
          try {
            const newTokens = await authClient.refreshToken(
              authData.tokens.refreshToken
            );
            authClient.saveAuthData(authData.user, newTokens);

            // Retry the original request with new token
            error.config.headers.Authorization = `Bearer ${newTokens.token}`;
            return instance.request(error.config);
          } catch {
            // Refresh failed, clear auth data and redirect to login
            authClient.clearAuthData();
            window.location.href = "/login";
            return Promise.reject(new Error("Session expired"));
          }
        } else {
          // No refresh token, redirect to login
          authClient.clearAuthData();
          window.location.href = "/login";
          return Promise.reject(new Error("Unauthorized access"));
        }
      }

      if (status === 403) {
        // Handle forbidden
        return Promise.reject(new Error("Access forbidden"));
      }

      if (status === 404) {
        // Handle not found
        return Promise.reject(new Error("Resource not found"));
      }

      // For all other errors
      return Promise.reject(
        new Error(data?.title || "An unexpected error occurred")
      );
    }
  );

  return instance;
};

export default ApiClient();
