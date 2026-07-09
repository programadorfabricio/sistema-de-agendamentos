import { BARBERS } from '../data/barbers.js';
import { SERVICES } from '../data/services.js';
import { BUSINESS_WHATSAPP } from '../data/constants.js';
import { money } from '../utils/formatCurrency.js';
import { formatDate } from '../utils/formatDate.js';
import { setFieldError, clearFieldError, trapFocusOpen, trapFocusClose, lockScroll, unlockScroll } from '../utils/accessibility.js';
import { renderCalendar, attachCalendarEvents } from './Calendar.js';
import { renderBarberSelectRow } from './BarberCard.js';
import { ustate } from './LoginSheet.js';

const today = new Date(); today.setHours(0,0,0,0);
const bstate = { service:null, step:0, barberIdx:null, date:null, time:null, name:'', phone:'', calYear:today.getFullYear(), calMonth:today.getMonth() };

let overlay, sheetTitle, sheetStepLabel, sheetProgressFill, sheetBody, sheetCta;
let onBookingConfirmedCb = null;

export function initBookingSheet({ onBookingConfirmed } = {}){
  onBookingConfirmedCb = onBookingConfirmed;
  overlay = document.getElementById('sheetOverlay');
  sheetTitle = document.getElementById('sheetTitle');
  sheetStepLabel = document.getElementById('sheetStepLabel');
  sheetProgressFill = document.getElementById('sheetProgressFill');
  sheetBody = document.getElementById('sheetBody');
  sheetCta = document.getElementById('sheetCta');

  document.getElementById('sheetClose').addEventListener('click', closeSheet);
  overlay.addEventListener('click', e => { if(e.target === overlay) closeSheet(); });
  sheetCta.addEventListener('click', handleCtaClick);
}

export function openBookingSheet(serviceOrId){
  bstate.service = typeof serviceOrId === 'string' ? SERVICES.find(s => s.id === serviceOrId) : serviceOrId;
  bstate.step = 0; bstate.barberIdx = null; bstate.date = null; bstate.time = null;
  bstate.name = ustate.loggedIn ? ustate.name : ''; bstate.phone = ustate.loggedIn ? ustate.phone : '';
  bstate.calYear = today.getFullYear(); bstate.calMonth = today.getMonth();
  sheetTitle.textContent = bstate.service.name;
  overlay.classList.add('open');
  lockScroll();
  renderSheet();
  trapFocusOpen(overlay, closeSheet);
}

function closeSheet(){ overlay.classList.remove('open'); unlockScroll(); trapFocusClose(); }

function renderSheet(){
  sheetStepLabel.textContent = bstate.step === 3 ? 'Confirmado' : `Passo ${bstate.step+1} de 3`;
  sheetProgressFill.style.width = bstate.step === 3 ? '100%' : `${((bstate.step+1)/3)*100}%`;

  if(bstate.step === 0) renderStep0();
  else if(bstate.step === 1) renderStep1();
  else if(bstate.step === 2) renderStep2();
  else renderStep3();
}

function renderStep0(){
  sheetBody.innerHTML = `
    <div class="step-heading"><h2>Escolha o profissional</h2><p>${bstate.service.name} · ${money(bstate.service.price)} · ${bstate.service.duration} min</p></div>
    <div class="barber-list">
      ${BARBERS.map((b,i) => renderBarberSelectRow(b, i, bstate.barberIdx===i)).join('')}
    </div>
  `;
  sheetBody.querySelectorAll('.barber-select-row').forEach(row => {
    row.addEventListener('click', () => { bstate.barberIdx = parseInt(row.dataset.idx); renderSheet(); });
  });
  sheetCta.textContent = 'Continuar';
  sheetCta.disabled = bstate.barberIdx === null;
}

function renderStep1(){
  sheetBody.innerHTML = `
    <button class="back-inline" id="sheetBack">‹ Trocar profissional</button>
    <div class="step-heading"><h2>Data e horário</h2><p>Horários riscados já estão ocupados.</p></div>
    ${renderCalendar(bstate, today)}
  `;
  document.getElementById('sheetBack').addEventListener('click', () => { bstate.step = 0; renderSheet(); });
  attachCalendarEvents(sheetBody, bstate, renderSheet);
  sheetCta.textContent = 'Continuar';
  sheetCta.disabled = !bstate.time;
}

function renderStep2(){
  const b = BARBERS[bstate.barberIdx];
  sheetBody.innerHTML = `
    <button class="back-inline" id="sheetBack">‹ Trocar data e horário</button>
    <div class="step-heading"><h2>Seus dados</h2><p>Confirme as informações para reservar.</p></div>
    <div class="summary-card">
      <div class="row"><img src="${b.photo}" alt=""><span>${b.name}</span></div>
      <div class="row"><span class="label">Serviço</span><span class="val">${bstate.service.name}</span></div>
      <div class="row"><span class="label">Dia</span><span class="val">${formatDate(bstate.date)}</span></div>
      <div class="row"><span class="label">Horário</span><span class="val">${bstate.time}</span></div>
      <div class="row"><span class="label">Valor</span><span class="val">${money(bstate.service.price)}</span></div>
    </div>
    <div class="field"><label for="nameInput">Nome completo</label><input id="nameInput" type="text" placeholder="Seu nome" value="${bstate.name}"></div>
    <div class="field"><label for="phoneInput">WhatsApp</label><input id="phoneInput" type="tel" placeholder="(19) 99999-0000" value="${bstate.phone}"></div>
  `;
  document.getElementById('sheetBack').addEventListener('click', () => { bstate.step = 1; renderSheet(); });
  const nameEl = document.getElementById('nameInput');
  const phoneEl = document.getElementById('phoneInput');
  nameEl.addEventListener('input', e => { bstate.name = e.target.value; clearFieldError(nameEl); });
  phoneEl.addEventListener('input', e => { bstate.phone = e.target.value; clearFieldError(phoneEl); });
  sheetCta.textContent = 'Confirmar agendamento';
  sheetCta.disabled = false;
}

function buildWhatsappLink(){
  const b = BARBERS[bstate.barberIdx];
  const msg = `Olá! Gostaria de confirmar meu agendamento na Navalha & Ofício:\n\n`
    + `Serviço: ${bstate.service.name}\n`
    + `Profissional: ${b.name}\n`
    + `Dia: ${formatDate(bstate.date)}\n`
    + `Horário: ${bstate.time}\n`
    + `Valor: ${money(bstate.service.price)}\n\n`
    + `Nome: ${bstate.name}\n`
    + `Telefone: ${bstate.phone}`;
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function renderStep3(){
  const b = BARBERS[bstate.barberIdx];
  sheetBody.innerHTML = `
    <div class="success">
      <div class="mark">✓</div>
      <h2>Horário reservado</h2>
      <p>Confirme seu agendamento no WhatsApp para garantir o horário.</p>
      <div class="summary-card">
        <div class="row"><img src="${b.photo}" alt=""><span>${b.name}</span></div>
        <div class="row"><span class="label">Serviço</span><span class="val">${bstate.service.name}</span></div>
        <div class="row"><span class="label">Dia</span><span class="val">${formatDate(bstate.date)}</span></div>
        <div class="row"><span class="label">Horário</span><span class="val">${bstate.time}</span></div>
      </div>
      <button class="btn whatsapp-btn" id="whatsappBtn" type="button">Abrir WhatsApp ↗</button>
    </div>
  `;
  document.getElementById('whatsappBtn').addEventListener('click', () => {
    window.open(buildWhatsappLink(), '_blank');
  });
  sheetCta.textContent = 'Fechar';
  sheetCta.disabled = false;
}

function handleCtaClick(){
  if(bstate.step === 2){
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    let valid = true;
    if(!bstate.name.trim()){ setFieldError(nameInput, 'Informe seu nome completo'); valid = false; } else clearFieldError(nameInput);
    if(!bstate.phone.trim()){ setFieldError(phoneInput, 'Informe seu número de WhatsApp'); valid = false; } else clearFieldError(phoneInput);
    if(!valid) return;
    bstate.step = 3; renderSheet();
    if(onBookingConfirmedCb) onBookingConfirmedCb();
    return;
  }
  if(bstate.step === 3){ closeSheet(); return; }
  bstate.step += 1; renderSheet();
}
