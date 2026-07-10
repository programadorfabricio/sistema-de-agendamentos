import type { HistoryEntry } from "@/types/client";

export function calculateFrequency(history: HistoryEntry[]): number | null {
  if (history.length <= 1) return null;
  let totalGap = 0;
  for (let i = 0; i < history.length - 1; i++) {
    totalGap += Math.round((history[i].date.getTime() - history[i + 1].date.getTime()) / 86400000);
  }
  return Math.round(totalGap / (history.length - 1));
}
