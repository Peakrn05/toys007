"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginApi, registerApi, socialLoginApi, guestLoginApi } from "@/lib/api/api-main";
import { apiClient } from "@/lib/api/client";


export interface AuthUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isGuest?: boolean;
  provider?: string;
  verified?: boolean;
}

export interface PlacedOrder {
  id: string;
  date: string;
  total: number;
  status: string;
  items: string[];
  statusColor: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  loyaltyPoints: number;
  orders: PlacedOrder[];
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginWithSocial: (provider: "facebook" | "google" | "line") => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
  addLoyaltyPoints: (points: number) => void;
  addOrder: (order: PlacedOrder) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "wot-token";
const USER_KEY = "wot-user";

function saveAuth(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function loadAuth(): { token: string; user: AuthUser } | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(TOKEN_KEY);
  const raw = localStorage.getItem(USER_KEY);
  if (!token || !raw) return null;
  try {
    return { token, user: JSON.parse(raw) };
  } catch {
    return null;
  }
}

function toAuthUser(apiUser: Record<string, unknown>): AuthUser {
  return {
    id: apiUser.id as string | undefined,
    firstName: (apiUser.firstName as string) || "",
    lastName: (apiUser.lastName as string) || "",
    email: (apiUser.email as string) || "",
    isGuest: (apiUser.isGuest as boolean) || false,
    provider: (apiUser.provider as string) || "email",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  const setAuthHeader = useCallback((token: string | null) => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, []);

  useEffect(() => {
    const stored = loadAuth();
    if (stored) {
      setUser(stored.user);
      setAuthHeader(stored.token);
    }
  }, [setAuthHeader]);

  const login = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      const { data } = await loginApi({ email, password });
      const authUser = toAuthUser(data.user);
      setUser(authUser);
      setAuthHeader(data.token);
      saveAuth(data.token, authUser);
      return { ok: true };
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Login failed.";
      return { ok: false, error: msg };
    }
  };

  const register = async (
    firstName: string, lastName: string, email: string, password: string
  ): Promise<{ ok: boolean; error?: string }> => {
    try {
      const { data } = await registerApi({ firstName, lastName, email, password });
      const authUser = toAuthUser(data.user);
      setUser(authUser);
      setAuthHeader(data.token);
      saveAuth(data.token, authUser);
      return { ok: true };
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Registration failed.";
      return { ok: false, error: msg };
    }
  };

  const loginWithSocial = async (provider: "facebook" | "google" | "line") => {
    try {
      const { data } = await socialLoginApi({
        provider,
        providerId: `${provider}_${Date.now()}`,
        firstName: provider.charAt(0).toUpperCase() + provider.slice(1),
        lastName: "User",
        email: `user@${provider === "google" ? "gmail" : provider}.com`,
      });
      const authUser = toAuthUser(data.user);
      setUser(authUser);
      setAuthHeader(data.token);
      saveAuth(data.token, authUser);
    } catch {
      // Social login failed silently — UI already shows loading state
    }
  };

  const loginAsGuest = async () => {
    try {
      const { data } = await guestLoginApi();
      const authUser = toAuthUser(data.user);
      setUser(authUser);
      setAuthHeader(data.token);
      saveAuth(data.token, authUser);
    } catch {
      setUser({ firstName: "Guest", lastName: "", email: "", isGuest: true });
    }
  };

  const logout = () => {
    setUser(null);
    setLoyaltyPoints(0);
    setAuthHeader(null);
    clearAuth();
  };

  const addLoyaltyPoints = (points: number) =>
    setLoyaltyPoints((prev) => prev + points);

  const addOrder = (order: PlacedOrder) =>
    setOrders((prev) => [order, ...prev]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: user !== null, loyaltyPoints, orders, login, register, loginWithSocial, loginAsGuest, logout, addLoyaltyPoints, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
