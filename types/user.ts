import type { HistoryEntry } from "./client";

export type AuthUser = {
  loggedIn: boolean;
  name: string;
  phone: string;
  method: string;
  photo: string;
  history: HistoryEntry[];
  preferences: Set<string>;
};
