"use client";

import { money } from "@/lib/formatCurrency";
import type { StaffDashboardStats } from "@/types/client";

type DashboardProps = {
  stats: StaffDashboardStats;
};

export function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="staff-dashboard">
      <div className="dash-stat">
        <span className="v">{stats.totalClients}</span>
        <span className="l">Clientes cadastrados</span>
      </div>
      <div className="dash-stat">
        <span className="v">{stats.todayAppointments}</span>
        <span className="l">Agendamentos hoje</span>
      </div>
      <div className="dash-stat">
        <span className="v">{money(stats.todayRevenue)}</span>
        <span className="l">Faturamento hoje</span>
      </div>
      <div className="dash-stat">
        <span className="v">{stats.topReturningClient.name}</span>
        <span className="l">{stats.topReturningClient.visits} visitas · mais fiel</span>
      </div>
    </div>
  );
}
