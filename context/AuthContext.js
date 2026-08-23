import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  whatsappApi,
  extractErrorMessage,
  getStoredToken,
  setStoredToken,
  getStoredAccount,
  setStoredAccount,
  getStoredCompany,
  setStoredCompany,
  clearStoredSession,
} from "../lib/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [company, setCompany] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first mount, restore whatever we have locally, then quietly confirm
  // it's still valid against the backend.
  useEffect(() => {
    const storedToken = getStoredToken();
    const storedAccount = getStoredAccount();
    const storedCompany = getStoredCompany();

    if (storedToken) {
      setToken(storedToken);
      setAccount(storedAccount);
      setCompany(storedCompany);

      whatsappApi
        .me()
        .then(({ data }) => {
          setAccount(data.account);
          setCompany(data.company);
          setStoredAccount(data.account);
          setStoredCompany(data.company);
        })
        .catch(() => {
          // Token expired/invalid - drop the stale session.
          clearStoredSession();
          setToken(null);
          setAccount(null);
          setCompany(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async ({ emailId, password }) => {
    const { data } = await whatsappApi.login({ emailId, password });
    setToken(data.accessToken);
    setAccount(data.account);
    setCompany(data.company);
    setStoredToken(data.accessToken);
    setStoredAccount(data.account);
    setStoredCompany(data.company);
    return data;
  }, []);

  const register = useCallback(async (payload) => {
    const { data } = await whatsappApi.register(payload);
    return data;
  }, []);

  const clearSession = useCallback(() => {
    clearStoredSession();
    setToken(null);
    setAccount(null);
    setCompany(null);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    router.push("/login");
  }, [clearSession, router]);

  const updateProfile = useCallback(async (payload) => {
    const { data } = await whatsappApi.updateProfile(payload);
    if (!data?.account || !data?.company) {
      throw new Error("The profile update response was incomplete.");
    }
    setAccount(data.account);
    setCompany(data.company);
    setStoredAccount(data.account);
    setStoredCompany(data.company);
    return data;
  }, []);

  const refreshMe = useCallback(async () => {
    const { data } = await whatsappApi.me();
    setAccount(data.account);
    setCompany(data.company);
    setStoredAccount(data.account);
    setStoredCompany(data.company);
    return data;
  }, []);

  const value = {
    account,
    company,
    token,
    isLoading,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
    clearSession,
    updateProfile,
    refreshMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export { extractErrorMessage };
