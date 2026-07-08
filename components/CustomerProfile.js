import { PREFERENCE_OPTIONS } from '../data/constants.js';
import { money } from '../utils/formatCurrency.js';
import { fmtShortDate } from '../utils/formatDate.js';
import { calculateSpent } from '../utils/calculateSpent.js';
import { calculateFavoriteBarber } from '../utils/calculateFavoriteBarber.js';
import { calculateFrequency } from '../utils/calculateFrequency.js';

export function renderCustomerProfile(ustate){
  const history = ustate.history;
  const stats = history.length ? {
    total: calculateSpent(history),
    favBarber: calculateFavoriteBarber(history),
    avgGap: calculateFrequency(history),
    last: history[0]
  } : null;

  return `
    <div class="profile-head">
      <img src="${ustate.photo}" alt="" class="profile-photo">
      <div>
        <div class="profile-name">${ustate.name}</div>
        <div class="profile-sub">${ustate.phone || 'Login via ' + ({google:'Google', apple:'Apple'}[ustate.method] || ustate.method)}</div>
      </div>
    </div>

    ${stats ? `
      <div class="profile-stats">
        <div class="profile-stat"><span class="v">${fmtShortDate(stats.last.date)}</span><span class="l">Último corte</span></div>
        <div class="profile-stat"><span class="v">${stats.avgGap ? stats.avgGap + ' dias' : '—'}</span><span class="l">Frequência média</span></div>
        <div class="profile-stat"><span class="v">${money(stats.total)}</span><span class="l">Total gasto</span></div>
      </div>
      <div class="summary-card" style="margin-bottom:18px;">
        <div class="row"><span class="label">Barbeiro favorito</span><span class="val">${stats.favBarber}</span></div>
      </div>
    ` : ''}

    <div class="cat-label">Suas preferências</div>
    <div class="pref-chips" id="prefChips">
      ${PREFERENCE_OPTIONS.map(p => `<button class="cat-chip ${ustate.preferences.has(p)?'active':''}" data-pref="${p}" type="button">${p}</button>`).join('')}
    </div>

    ${stats ? `
      <div class="cat-label">Histórico de cortes</div>
      <div class="history-list">
        ${history.map(h => `
          <div class="history-row">
            <div>
              <div class="history-service">${h.service}</div>
              <div class="history-meta">${h.barber} · ${fmtShortDate(h.date)}</div>
            </div>
            <div class="history-price">${money(h.price)}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

export function attachCustomerProfileEvents(container, ustate, onChange){
  container.querySelectorAll('#prefChips .cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const p = chip.dataset.pref;
      if(ustate.preferences.has(p)) ustate.preferences.delete(p); else ustate.preferences.add(p);
      onChange();
    });
  });
}
