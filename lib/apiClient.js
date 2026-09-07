import axios from "axios";

// Base URL of the ERP/WhatsApp backend. Configure this per environment via
// NEXT_PUBLIC_API_BASE_URL - defaults to the local dev server the backend
// currently runs on.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BACKEND_URL || "http://localhost:9080";

const TOKEN_STORAGE_KEY = "bizport_company_token";
const ACCOUNT_STORAGE_KEY = "bizport_company_account";
const COMPANY_STORAGE_KEY = "bizport_company_profile";

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token) {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function getStoredAccount() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setStoredAccount(account) {
  if (typeof window === "undefined") return;
  if (account) {
    window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
  } else {
    window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
  }
}

export function getStoredCompany() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(COMPANY_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setStoredCompany(company) {
  if (typeof window === "undefined") return;
  if (company) {
    window.localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(company));
  } else {
    window.localStorage.removeItem(COMPANY_STORAGE_KEY);
  }
}

export function clearStoredSession() {
  setStoredToken(null);
  setStoredAccount(null);
  setStoredCompany(null);
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach the company-portal JWT to every request, when we have one.
apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Extracts a human-readable error message from an axios error. */
export function extractErrorMessage(
  error,
  fallback = "Something went wrong. Please try again.",
) {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return fallback;
}

export const whatsappApi = {
  register: (payload) =>
    apiClient.post("/api/whatsapp/company-auth/register", payload),
  login: (payload) =>
    apiClient.post("/api/whatsapp/company-auth/login", payload),
  forgotPassword: (payload) =>
    apiClient.post("/api/whatsapp/company-auth/forgot-password", payload),
  resetPassword: (payload) =>
    apiClient.post("/api/whatsapp/company-auth/reset-password", payload),
  updateProfile: (payload) =>
    apiClient.patch("/api/whatsapp/company-auth/profile", payload),
  requestEmailChange: (payload) =>
    apiClient.post("/api/whatsapp/company-auth/email-change/request", payload),
  confirmEmailChange: (payload) =>
    apiClient.post("/api/whatsapp/company-auth/email-change/confirm", payload),
  me: () => apiClient.get("/api/whatsapp/company-auth/me"),
  messages: (params) =>
    apiClient.get("/api/whatsapp/company-auth/messages", { params }),
  exchangeEmbeddedSignupCode: (payload) =>
    apiClient.post(
      "/api/whatsapp/company-auth/embedded-signup/exchange",
      payload,
    ),
  completeEmbeddedSignup: (payload) =>
    apiClient.put("/api/whatsapp/company-auth/embedded-signup", payload),
  generateApiKey: (payload) =>
    apiClient.post("/api/whatsapp/api-key/generate", payload),
  rotateApiKey: (payload) =>
    apiClient.post("/api/whatsapp/api-key/rotate", payload),
  revokeApiKey: (payload) =>
    apiClient.post("/api/whatsapp/api-key/revoke", payload),
  testOnlineReport: (params) => apiClient.get("/findBySql", { params }),
};

export default apiClient;
