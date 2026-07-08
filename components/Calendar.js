import { DOW, MONTHS } from '../data/constants.js';
import { sameDay } from '../utils/formatDate.js';
import { timesForDate, occupied } from '../utils/scheduling.js';

const PERIODS = [
  { title:'Manhã', filter:t => parseInt(t) < 12 },
  { title:'Tarde', filter:t => parseInt(t) >= 12 && parseInt(t) < 18 },
  { title:'Noite', filter:t => parseInt(t) >= 18 }
];

export function renderCalendar(bstate, today){
  const firstOfMonth = new Date(bstate.calYear, bstate.calMonth, 1);
  const daysInMonth = new Date(bstate.calYear, bstate.calMonth+1, 0).getDate();
  const startOffset = firstOfMonth.getDay();
  const isCurrentMonth = bstate.calYear === today.getFullYear() && bstate.calMonth === today.getMonth();

  let cells = '';
  for(let i=0; i<startOffset; i++) cells += `<div class="day-cell empty"></div>`;
  for(let d=1; d<=daysInMonth; d++){
    const cellDate = new Date(bstate.calYear, bstate.calMonth, d);
    const isPast = cellDate < today;
    const isSelected = bstate.date && sameDay(cellDate, bstate.date);
    const isToday = sameDay(cellDate, today);
    cells += `<button class="day-cell ${isSelected?'selected':''} ${isToday?'today':''}" data-day="${d}" ${isPast?'disabled':''}>${d}</button>`;
  }

  const timesHtml = bstate.date ? PERIODS.map(p => {
    const times = timesForDate(bstate.date).filter(p.filter);
    if(times.length === 0) return '';
    return `
      <div class="period-block">
        <div class="period-title">${p.title}</div>
        <div class="time-grid">
          ${times.map((t,ti) => {
            const occ = occupied(bstate.barberIdx, bstate.date, ti);
            return `<button class="time-slot ${bstate.time===t?'selected':''}" data-time="${t}" ${occ?'disabled':''}>${t}</button>`;
          }).join('')}
        </div>
      </div>
    `;
  }).join('') : `<p style="color:var(--ivory-dim); font-size:0.85rem;">Selecione uma data para ver os horários.</p>`;

  return `
    <div class="month-nav">
      <button class="month-nav-btn" id="prevMonth" aria-label="Mês anterior" ${isCurrentMonth?'disabled':''}>‹</button>
      <div class="month-label">${MONTHS[bstate.calMonth]} de ${bstate.calYear}</div>
      <button class="month-nav-btn" id="nextMonth" aria-label="Próximo mês">›</button>
    </div>
    <div class="calendar-dow">${DOW.map(d=>`<span>${d}</span>`).join('')}</div>
    <div class="calendar-grid">${cells}</div>
    ${timesHtml}
  `;
}

export function attachCalendarEvents(container, bstate, onChange){
  container.querySelector('#prevMonth')?.addEventListener('click', () => {
    bstate.calMonth -= 1;
    if(bstate.calMonth < 0){ bstate.calMonth = 11; bstate.calYear -= 1; }
    onChange();
  });
  container.querySelector('#nextMonth')?.addEventListener('click', () => {
    bstate.calMonth += 1;
    if(bstate.calMonth > 11){ bstate.calMonth = 0; bstate.calYear += 1; }
    onChange();
  });
  container.querySelectorAll('.day-cell:not(.empty):not(:disabled)').forEach(cell => {
    cell.addEventListener('click', () => {
      bstate.date = new Date(bstate.calYear, bstate.calMonth, parseInt(cell.dataset.day));
      bstate.time = null;
      onChange();
    });
  });
  container.querySelectorAll('.time-slot:not(:disabled)').forEach(slot => {
    slot.addEventListener('click', () => { bstate.time = slot.dataset.time; onChange(); });
  });
}
