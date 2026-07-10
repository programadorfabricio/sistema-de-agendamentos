import { SERVICES } from "./services";
import { BARBERS } from "./barbers";
import type { Client, HistoryEntry, StaffDashboardStats } from "@/types/client";

export function generateMockHistory(): HistoryEntry[] {
  const count = 3 + Math.floor(Math.random() * 3); // 3 a 5 visitas
  const entries: HistoryEntry[] = [];
  let cursor = new Date();
  for (let i = 0; i < count; i++) {
    const daysBack = 16 + Math.floor(Math.random() * 22); // 16-37 dias entre visitas
    cursor = new Date(cursor.getTime() - daysBack * 86400000);
    const svc = SERVICES[Math.floor(Math.random() * SERVICES.length)];
    const barber = BARBERS[Math.floor(Math.random() * BARBERS.length)];
    entries.push({ date: new Date(cursor), service: svc.name, barber: barber.name, price: svc.price === null ? 40 : svc.price });
  }
  return entries; // já em ordem do mais recente para o mais antigo
}

export const CLIENTS_MOCK: Client[] = [
  { id: 'c1', name: 'André Barbosa', notes: 'Sempre pede degradê bem baixo nas laterais. Conversa bastante sobre carros.', preferences: ['Degradê alto', 'Navalha'], quickNotes: ['Máquina 1 nas laterais'], history: generateMockHistory() },
  { id: 'c2', name: 'Vinícius Prado', notes: 'Prefere silêncio durante o atendimento. Alérgico a alguns pós-barba com álcool.', preferences: ['Barba curta', 'Sem máquina 0'], quickNotes: ['Não gosta de conversa', 'Alergia'], history: generateMockHistory() },
  { id: 'c3', name: 'Eduardo Nakamura', notes: 'Cliente antigo, sempre agenda com o Kaique. Gosta de pontualidade.', preferences: ['Corte social'], quickNotes: [], history: generateMockHistory() },
  { id: 'c4', name: 'Ricardo Almeida', notes: 'Costuma atrasar uns 10-15 min. Bom cliente, sempre fecha o combo completo.', preferences: ['Degradê alto', 'Barba longa'], quickNotes: ['Café sem açúcar', 'Fazer acabamento na sobrancelha'], history: generateMockHistory() }
];

export const STAFF_DASHBOARD: StaffDashboardStats = {
  totalClients: 182,
  todayAppointments: 8,
  todayRevenue: 610,
  topReturningClient: { name: 'Lucas M.', visits: 18 }
};
