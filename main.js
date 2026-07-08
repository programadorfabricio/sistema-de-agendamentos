import { CATEGORIES, SERVICES } from './data/services.js';
import { BARBERS } from './data/barbers.js';
import { money } from './utils/formatCurrency.js';
import { renderServiceList, attachServiceListEvents } from './components/ServiceCard.js';
import { renderProfissionaisPanel } from './components/BarberCard.js';
import { initBookingSheet, openBookingSheet } from './components/BookingSheet.js';
import { renderReviewsPanel, initReviewSheet } from './components/ReviewCard.js';
import { initLoginSheet } from './components/LoginSheet.js';
import { initStaffPanel } from './components/StaffPanel.js';

/* ---------- Tema claro/escuro ---------- */
const THEME_KEY = 'navalha-theme';
function getSavedTheme(){ try { return localStorage.getItem(THEME_KEY); } catch(e){ return null; } }
function saveTheme(theme){ try { localStorage.setItem(THEME_KEY, theme); } catch(e){} }
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggleBtn');
  if(btn){
    btn.textContent = theme === 'light' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro');
  }
}
applyTheme(getSavedTheme() || 'dark');
document.getElementById('themeToggleBtn').addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  saveTheme(next);
});

/* ---------- Compartilhar ---------- */
document.getElementById('shareBtn').addEventListener('click', async () => {
  const shareData = {
    title: 'Navalha & Ofício — Barbearia em Paulínia',
    text: 'Dá uma olhada na Navalha & Ofício e agenda seu horário!',
    url: window.location.href
  };
  if(navigator.share){
    try { await navigator.share(shareData); } catch(e){ /* usuário cancelou o compartilhamento */ }
    return;
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    try {
      await navigator.clipboard.writeText(shareData.url);
      alert('Link copiado! Agora é só colar onde quiser compartilhar.');
      return;
    } catch(e){ /* segue para o fallback abaixo */ }
  }
  alert(shareData.url);
});

/* ---------- Tabs ---------- */
const tabsNav = document.getElementById('tabs');
const tabButtons = Array.from(tabsNav.querySelectorAll('.tab-btn'));

function activateTab(btn, focusIt){
  tabButtons.forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
    b.tabIndex = -1;
  });
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  btn.tabIndex = 0;
  document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  if(focusIt) btn.focus();
}

tabsNav.addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn');
  if(!btn) return;
  activateTab(btn, false);
});

tabsNav.addEventListener('keydown', e => {
  if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) return;
  const current = tabButtons.findIndex(b => b.classList.contains('active'));
  let next = current;
  if(e.key === 'ArrowRight') next = (current + 1) % tabButtons.length;
  else if(e.key === 'ArrowLeft') next = (current - 1 + tabButtons.length) % tabButtons.length;
  else if(e.key === 'Home') next = 0;
  else if(e.key === 'End') next = tabButtons.length - 1;
  e.preventDefault();
  activateTab(tabButtons[next], true);
});

/* ---------- Catálogo: categorias + busca + seleção múltipla ---------- */
let activeCat = 'todos';
let searchTerm = '';

const FAV_KEY = 'navalha-favoritos';
function loadFavorites(){
  try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY)) || []); } catch(e){ return new Set(); }
}
function saveFavorites(){ try { localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(FAVORITES))); } catch(e){} }
const FAVORITES = loadFavorites();
const SELECTED = new Set();

function renderCategories(){
  const el = document.getElementById('catScroller');
  el.innerHTML = CATEGORIES.map(c => `<button class="cat-chip ${activeCat===c.id?'active':''}" data-cat="${c.id}">${c.label}</button>`).join('');
  el.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => { activeCat = chip.dataset.cat; renderCategories(); renderServices(); });
  });
}

function renderMultiSelectBar(){
  const bar = document.getElementById('multiSelectBar');
  const panel = document.getElementById('panel-servicos');
  if(SELECTED.size === 0){ bar.classList.remove('visible'); panel.style.paddingBottom = ''; return; }
  const items = SERVICES.filter(s => SELECTED.has(s.id));
  const totalDuration = items.reduce((sum, s) => sum + s.duration, 0);
  const hasUnknownPrice = items.some(s => s.price === null);
  const totalPrice = items.reduce((sum, s) => sum + (s.price || 0), 0);
  const hours = Math.floor(totalDuration / 60);
  const mins = totalDuration % 60;
  const durationLabel = hours > 0 ? `${hours}h${mins > 0 ? mins + 'min' : ''}` : `${mins}min`;
  document.getElementById('msbCount').textContent = `${items.length} serviço${items.length > 1 ? 's' : ''} selecionado${items.length > 1 ? 's' : ''}`;
  document.getElementById('msbDuration').textContent = `⏱ ${durationLabel} total · ${hasUnknownPrice ? 'a partir de ' : ''}${money(totalPrice)}`;
  bar.classList.add('visible');
  panel.style.paddingBottom = '86px';
}

function renderServices(){
  const el = document.getElementById('serviceList');
  const filtered = SERVICES.filter(s => {
    const matchCat = activeCat === 'todos' || (activeCat === 'favoritos' ? FAVORITES.has(s.id) : s.cat === activeCat);
    const matchSearch = !searchTerm || s.name.toLowerCase().includes(searchTerm) || s.desc.toLowerCase().includes(searchTerm);
    return matchCat && matchSearch;
  });
  if(filtered.length === 0){
    el.innerHTML = `<div class="empty-state">${activeCat === 'favoritos' ? 'Você ainda não favoritou nenhum serviço.' : 'Nenhum serviço encontrado.'}</div>`;
    return;
  }
  el.innerHTML = renderServiceList(filtered, { selected: SELECTED, favorites: FAVORITES });
  attachServiceListEvents(el, {
    onAgendar: id => openBookingSheet(id),
    onToggleFavorite: id => {
      if(FAVORITES.has(id)) FAVORITES.delete(id); else FAVORITES.add(id);
      saveFavorites();
      renderServices();
    },
    onToggleSelect: id => {
      if(SELECTED.has(id)) SELECTED.delete(id); else SELECTED.add(id);
      renderServices();
      renderMultiSelectBar();
    }
  });
}

document.getElementById('searchInput').addEventListener('input', e => {
  searchTerm = e.target.value.trim().toLowerCase();
  renderServices();
});

document.getElementById('msbContinueBtn').addEventListener('click', () => {
  const items = SERVICES.filter(s => SELECTED.has(s.id));
  if(items.length === 0) return;
  const hasUnknownPrice = items.some(s => s.price === null);
  const combined = {
    id:'combo-' + Array.from(SELECTED).join('-'),
    name: items.length === 1 ? items[0].name : `${items.length} serviços (${items.map(i => i.name).join(', ')})`,
    price: hasUnknownPrice ? null : items.reduce((sum, s) => sum + s.price, 0),
    duration: items.reduce((sum, s) => sum + s.duration, 0)
  };
  openBookingSheet(combined);
});

/* ---------- Skeleton loading ---------- */
function skeletonRows(kind, count){
  if(kind === 'service'){
    return Array.from({length:count}).map(() => `
      <div class="service-row">
        <div class="skeleton skel-avatar"></div>
        <div class="svc-info">
          <div class="skeleton skel-line medium" style="margin-bottom:8px;"></div>
          <div class="skeleton skel-line long" style="margin-bottom:10px;"></div>
          <div class="skeleton skel-line short"></div>
        </div>
      </div>
    `).join('');
  }
  if(kind === 'pro'){
    return Array.from({length:count}).map(() => `
      <div class="pro-row">
        <div class="skeleton skel-avatar" style="width:52px;height:52px;"></div>
        <div style="flex:1;">
          <div class="skeleton skel-line medium" style="margin-bottom:8px;"></div>
          <div class="skeleton skel-line short"></div>
        </div>
      </div>
    `).join('');
  }
  if(kind === 'review'){
    return Array.from({length:count}).map(() => `
      <div class="review-card">
        <div class="review-head">
          <div class="skeleton skel-avatar"></div>
          <div style="flex:1;">
            <div class="skeleton skel-line medium" style="margin-bottom:6px;"></div>
            <div class="skeleton skel-line short"></div>
          </div>
        </div>
        <div class="skeleton skel-line long" style="margin-bottom:6px;"></div>
        <div class="skeleton skel-line medium"></div>
      </div>
    `).join('');
  }
  return '';
}

document.getElementById('serviceList').innerHTML = skeletonRows('service', 4);
document.getElementById('panel-profissionais').innerHTML = skeletonRows('pro', 3);
document.getElementById('reviewsList').innerHTML = skeletonRows('review', 2);

setTimeout(() => {
  renderCategories();
  renderServices();
  document.getElementById('panel-profissionais').innerHTML = renderProfissionaisPanel(BARBERS);
  renderReviewsPanel();
}, 650);

/* ---------- Inicialização dos sheets ---------- */
initLoginSheet();
initReviewSheet();
initStaffPanel();
initBookingSheet({
  onBookingConfirmed: () => {
    SELECTED.clear();
    renderServices();
    renderMultiSelectBar();
  }
});
