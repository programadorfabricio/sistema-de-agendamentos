import { money } from '../utils/formatCurrency.js';

export function renderServiceCard(s, { selected, favorite }){
  return `
    <div class="service-row">
      <button class="svc-select ${selected?'selected':''}" data-id="${s.id}" aria-pressed="${selected}" aria-label="Selecionar ${s.name} para agendar junto com outros serviços"></button>
      <div class="svc-icon">${s.icon}</div>
      <div class="svc-info">
        <div class="svc-name">${s.name}</div>
        <div class="svc-desc">${s.desc}</div>
        <div class="svc-meta">
          <span class="svc-price">${money(s.price)}</span>
          <span class="svc-duration">⏱ ${s.duration} min</span>
        </div>
      </div>
      <div class="svc-actions">
        <button class="svc-fav ${favorite?'active':''}" data-id="${s.id}" aria-pressed="${favorite}" aria-label="${favorite ? 'Remover ' + s.name + ' dos favoritos' : 'Adicionar ' + s.name + ' aos favoritos'}">${favorite ? '♥' : '♡'}</button>
        <button class="svc-agendar" data-id="${s.id}">Agendar</button>
      </div>
    </div>
  `;
}

export function renderServiceList(services, { selected, favorites }){
  return services.map(s => renderServiceCard(s, { selected: selected.has(s.id), favorite: favorites.has(s.id) })).join('');
}

export function attachServiceListEvents(container, { onAgendar, onToggleFavorite, onToggleSelect }){
  container.querySelectorAll('.svc-agendar').forEach(btn => {
    btn.addEventListener('click', () => onAgendar(btn.dataset.id));
  });
  container.querySelectorAll('.svc-fav').forEach(btn => {
    btn.addEventListener('click', () => onToggleFavorite(btn.dataset.id));
  });
  container.querySelectorAll('.svc-select').forEach(btn => {
    btn.addEventListener('click', () => onToggleSelect(btn.dataset.id));
  });
}
