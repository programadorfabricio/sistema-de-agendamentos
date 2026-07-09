import { BUSINESS_HOURS } from "@/data/constants";

export function timesForDate(date: Date): string[] {
  const hours = BUSINESS_HOURS[date.getDay()];
  const t: string[] = [];
  for (let h = hours.open; h < hours.close; h++) {
    t.push(h.toString().padStart(2, '0') + ':00');
    t.push(h.toString().padStart(2, '0') + ':30');
  }
  t.push(hours.close.toString().padStart(2, '0') + ':00');
  return t;
}

// Ocupação determinística (mock) baseada na data, barbeiro e horário — em produção viria do backend
export function occupied(bIdx: number, date: Date, tIdx: number): boolean {
  const seed = date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate();
  return (tIdx + bIdx * 2 + seed * 3) % 7 === 0 || (tIdx * 3 + bIdx + seed) % 11 === 0;
}
