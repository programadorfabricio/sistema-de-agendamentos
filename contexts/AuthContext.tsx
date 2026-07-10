"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { generateMockHistory } from "@/data/customers-mock";
import type { AuthUser } from "@/types/user";

const LOGGED_OUT: AuthUser = {
  loggedIn: false,
  name: "",
  phone: "",
  method: "",
  photo: "",
  history: [],
  preferences: new Set(),
};

type AuthContextValue = {
  user: AuthUser;
  login: (name: string, phone: string, method: string) => void;
  logout: () => void;
  togglePreference: (pref: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Nunca persistido — igual ao ustate do prototipo vanilla, o login simulado
  // vale so pra sessao atual e comeca deslogado tanto no servidor quanto no
  // primeiro render do cliente (sem risco de mismatch de hidratacao).
  const [user, setUser] = useState<AuthUser>(LOGGED_OUT);

  function login(name: string, phone: string, method: string) {
    setUser({
      loggedIn: true,
      name,
      phone,
      method,
      photo: `https://picsum.photos/seed/${encodeURIComponent(name)}/200/200`,
      history: generateMockHistory(),
      preferences: new Set(),
    });
  }

  function logout() {
    setUser(LOGGED_OUT);
  }

  function togglePreference(pref: string) {
    setUser((prev) => {
      const next = new Set(prev.preferences);
      if (next.has(pref)) next.delete(pref);
      else next.add(pref);
      return { ...prev, preferences: next };
    });
  }

  return <AuthContext.Provider value={{ user, login, logout, togglePreference }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
}
