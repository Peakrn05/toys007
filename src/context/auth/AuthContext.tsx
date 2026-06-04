"use client";

import { createContext, useContext, useState } from "react";

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  isGuest?: boolean;
  provider?: "email" | "facebook" | "google" | "line";
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginWithSocial: (provider: "facebook" | "google" | "line") => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 700));
    if (!email.includes("@")) return { ok: false, error: "Invalid email address." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    const name = email.split("@")[0].replace(/[._]/g, " ");
    const [first, ...rest] = name.split(" ");
    setUser({
      firstName: first ? first.charAt(0).toUpperCase() + first.slice(1) : "User",
      lastName: rest.join(" ") || "",
      email,
      provider: "email",
    });
    return { ok: true };
  };

  const register = async (
    firstName: string, lastName: string, email: string, password: string
  ): Promise<{ ok: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 800));
    if (!email.includes("@")) return { ok: false, error: "Invalid email address." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    setUser({ firstName, lastName, email, provider: "email" });
    return { ok: true };
  };

  const loginWithSocial = async (provider: "facebook" | "google" | "line") => {
    await new Promise((r) => setTimeout(r, 600));
    const mock: Record<typeof provider, AuthUser> = {
      facebook: { firstName: "Facebook", lastName: "User", email: "user@facebook.com", provider: "facebook" },
      google:   { firstName: "Google",   lastName: "User", email: "user@gmail.com",    provider: "google" },
      line:     { firstName: "LINE",     lastName: "User", email: "user@line.me",      provider: "line" },
    };
    setUser(mock[provider]);
  };

  const loginAsGuest = () =>
    setUser({ firstName: "Guest", lastName: "", email: "", isGuest: true });

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: user !== null, login, register, loginWithSocial, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
