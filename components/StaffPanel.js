import { CLIENTS_MOCK, STAFF_DASHBOARD } from '../data/customers-mock.js';
import { STAFF_QUICK_NOTES } from '../data/constants.js';
import { money } from '../utils/formatCurrency.js';
import { fmtShortDate } from '../utils/formatDate.js';
import { calculateSpent } from '../utils/calculateSpent.js';
import { calculateFavoriteBarber } from '../utils/calculateFavoriteBarber.js';
import { calculateFrequency } from '../utils/calculateFrequency.js';
import { initials } from '../utils/text.js';
import { trapFocusOpen, trapFocusClose, lockScroll, unlockScroll } from '../utils/accessibility.js';
import { renderDashboard } from './Dashboard.js';

let staffOverlay, staffSheetSub, staffSheetBody;
let staffSelectedClientId = null;

export function initStaffPanel(){
  staffOverlay = document.getElementById('staffSheetOverlay');
  staffSheetSub = document.getElementById('staffSheetSub');
  staffSheetBody = document.getElementById('staffSheetBody');
  document.getElementById('staffDemoBtn').addEventListener('click', openStaffSheet);
  document.getElementById('staffSheetClose').addEventListener('click', closeStaffSheet);
  staffOverlay.addEventListener('click', e => { if(e.target === staffOverlay) closeStaffSheet(); });
}

function openStaffSheet(){
  staffSelectedClientId = null;
  staffOverlay.classList.add('open');
  lockScroll();
  renderStaffSheet();
  trapFocusOpen(staffOverlay, closeStaffSheet);
}
function closeStaffSheet(){ staffOverlay.classList.remove('open'); unlockScroll(); trapFocusClose(); }

function statsFor(history){
  return { total: calculateSpent(history), favBarber: calculateFavoriteBarber(history), avgGap: calculateFrequency(history), last: history[0] };
}

function renderStaffSheet(){
  if(!staffSelectedClientId){
    staffSheetSub.textContent = `${CLIENTS_MOCK.length} clientes cadastrados`;
    staffSheetBody.innerHTML = `
      ${renderDashboard(STAFF_DASHBOARD)}
      <div class="cat-label">Clientes</div>
      ${CLIENTS_MOCK.map(c => {
        const stats = statsFor(c.history);
        return `
          <button class="staff-client-row" data-id="${c.id}">
            <div class="avatar">${initials(c.name)}</div>
            <div>
              <div class="name">${c.name}</div>
              <div class="meta">Último corte: ${fmtShortDate(stats.last.date)} · ${money(stats.total)} gastos</div>
            </div>
          </button>
        `;
      }).join('')}
    `;
    staffSheetBody.querySelectorAll('.staff-client-row').forEach(row => {
      row.addEventListener('click', () => { staffSelectedClientId = row.dataset.id; renderStaffSheet(); });
    });
    return;
  }

  const client = CLIENTS_MOCK.find(c => c.id === staffSelectedClientId);
  const stats = statsFor(client.history);
  staffSheetSub.textContent = 'Ficha do cliente';
  staffSheetBody.innerHTML = `
    <button class="back-inline" id="staffBack">‹ Todos os clientes</button>
    <div class="profile-head">
      <div class="avatar" style="width:64px;height:64px;font-size:1.1rem;border-radius:50%;background:var(--brass-soft);color:var(--brass);display:flex;align-items:center;justify-content:center;flex-shrink:0;">${initials(client.name)}</div>
      <div><div class="profile-name">${client.name}</div></div>
    </div>
    <div class="profile-stats">
      <div class="profile-stat"><span class="v">${fmtShortDate(stats.last.date)}</span><span class="l">Último corte</span></div>
      <div class="profile-stat"><span class="v">${stats.avgGap ? stats.avgGap + ' dias' : '—'}</span><span class="l">Frequência média</span></div>
      <div class="profile-stat"><span class="v">${money(stats.total)}</span><span class="l">Total gasto</span></div>
    </div>
    <div class="summary-card" style="margin-bottom:18px;">
      <div class="row"><span class="label">Barbeiro favorito</span><span class="val">${stats.favBarber}</span></div>
    </div>

    <div class="cat-label">Preferências</div>
    <div class="pref-chips">
      ${client.preferences.length ? client.preferences.map(p => `<span class="cat-chip active" style="pointer-events:none;">${p}</span>`).join('') : '<span style="color:var(--ivory-dim); font-size:0.82rem;">Nenhuma preferência registrada.</span>'}
    </div>

    <div class="cat-label">Histórico de cortes</div>
    <div class="history-list">
      ${client.history.map(h => `
        <div class="history-row">
          <div>
            <div class="history-service">${h.service}</div>
            <div class="history-meta">${h.barber} · ${fmtShortDate(h.date)}</div>
          </div>
          <div class="history-price">${money(h.price)}</div>
        </div>
      `).join('')}
    </div>

    <div class="cat-label">Observações do barbeiro <span style="color:var(--ivory-dim); text-transform:none; letter-spacing:0;">(privado — cliente não vê)</span></div>
    <div class="quick-notes" id="quickNotes">
      ${STAFF_QUICK_NOTES.map((q) => `
        <label class="quick-note-item">
          <input type="checkbox" data-note="${q}" ${client.quickNotes.includes(q) ? 'checked' : ''}>
          <span>${q}</span>
        </label>
      `).join('')}
    </div>
    <div class="field">
      <textarea id="staffNotesInput" class="staff-notes-textarea" placeholder="Anotações sobre o cliente...">${client.notes}</textarea>
    </div>
  `;
  staffSheetBody.querySelectorAll('#quickNotes input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const note = cb.dataset.note;
      if(cb.checked){ if(!client.quickNotes.includes(note)) client.quickNotes.push(note); }
      else { client.quickNotes = client.quickNotes.filter(n => n !== note); }
    });
  });
  document.getElementById('staffBack').addEventListener('click', () => { staffSelectedClientId = null; renderStaffSheet(); });
  document.getElementById('staffNotesInput').addEventListener('input', e => { client.notes = e.target.value; });
}
