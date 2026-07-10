export type HistoryEntry = {
  date: Date;
  service: string;
  barber: string;
  price: number;
};

export type Client = {
  id: string;
  name: string;
  notes: string;
  preferences: string[];
  quickNotes: string[];
  history: HistoryEntry[];
};

export type StaffDashboardStats = {
  totalClients: number;
  todayAppointments: number;
  todayRevenue: number;
  topReturningClient: { name: string; visits: number };
};
