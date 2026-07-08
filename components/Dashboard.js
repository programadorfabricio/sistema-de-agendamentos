import { money } from '../utils/formatCurrency.js';

export function renderDashboard(stats){
  return `
    <div class="staff-dashboard">
      <div class="dash-stat"><span class="v">${stats.totalClients}</span><span class="l">Clientes cadastrados</span></div>
      <div class="dash-stat"><span class="v">${stats.todayAppointments}</span><span class="l">Agendamentos hoje</span></div>
      <div class="dash-stat"><span class="v">${money(stats.todayRevenue)}</span><span class="l">Faturamento hoje</span></div>
      <div class="dash-stat"><span class="v">${stats.topReturningClient.name}</span><span class="l">${stats.topReturningClient.visits} visitas · mais fiel</span></div>
    </div>
  `;
}
