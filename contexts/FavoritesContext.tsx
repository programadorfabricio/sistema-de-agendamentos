"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

const FAVORITES_STORAGE_KEY = "navalha-favoritos";

// Store externa (fora do React) pro useSyncExternalStore — o padrao correto pra
// ler/escrever localStorage sem cair no anti-padrao de setState sincrono dentro
// de efeito, e sem risco de mismatch de hidratacao: getServerSnapshot garante
// que o primeiro render do cliente bate com o do servidor (sempre vazio).
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedSnapshot: Set<string> = new Set();

function parseFavorites(raw: string | null): Set<string> {
  try {
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function getSnapshot(): Set<string> {
  const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = parseFavorites(raw);
  }
  return cachedSnapshot;
}

function getServerSnapshot(): Set<string> {
  return cachedSnapshot;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function writeFavorites(next: Set<string>) {
  cachedSnapshot = next;
  cachedRaw = JSON.stringify(Array.from(next));
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, cachedRaw);
  } catch {
    // localStorage indisponivel — favoritos valem so para esta sessao
  }
  listeners.forEach((l) => l());
}

type FavoritesContextValue = {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleFavorite(id: string) {
    const next = new Set(getSnapshot());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    writeFavorites(next);
  }

  return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites deve ser usado dentro de um FavoritesProvider");
  return ctx;
}
