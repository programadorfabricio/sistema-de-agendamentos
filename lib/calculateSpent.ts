import type { HistoryEntry } from "@/types/client";

export function calculateSpent(history: HistoryEntry[]): number {
  return history.reduce((sum, h) => sum + h.price, 0);
}
