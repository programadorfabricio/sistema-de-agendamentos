"use client";

import { DOW, MONTHS } from "@/data/constants";
import { sameDay } from "@/lib/formatDate";
import { timesForDate, occupied } from "@/lib/scheduling";

const PERIODS = [
  { title: "Manhã", filter: (t: string) => parseInt(t) < 12 },
  { title: "Tarde", filter: (t: string) => parseInt(t) >= 12 && parseInt(t) < 18 },
  { title: "Noite", filter: (t: string) => parseInt(t) >= 18 },
];

type CalendarProps = {
  year: number;
  month: number;
  selectedDate: Date | null;
  selectedTime: string | null;
  today: Date;
  barberIdx: number;
  onSelectDay: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export function Calendar({
  year,
  month,
  selectedDate,
  selectedTime,
  today,
  barberIdx,
  onSelectDay,
  onSelectTime,
  onPrevMonth,
  onNextMonth,
}: CalendarProps) {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstOfMonth.getDay();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  const dayCells = [];
  for (let i = 0; i < startOffset; i++) {
    dayCells.push(<div key={`empty-${i}`} className="day-cell empty" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, month, d);
    const isPast = cellDate < today;
    const isSelected = !!selectedDate && sameDay(cellDate, selectedDate);
    const isToday = sameDay(cellDate, today);
    dayCells.push(
      <button
        key={d}
        type="button"
        className={`day-cell ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
        disabled={isPast}
        onClick={() => onSelectDay(cellDate)}
      >
        {d}
      </button>
    );
  }

  return (
    <>
      <div className="month-nav">
        <button type="button" className="month-nav-btn" aria-label="Mês anterior" disabled={isCurrentMonth} onClick={onPrevMonth}>
          ‹
        </button>
        <div className="month-label">
          {MONTHS[month]} de {year}
        </div>
        <button type="button" className="month-nav-btn" aria-label="Próximo mês" onClick={onNextMonth}>
          ›
        </button>
      </div>
      <div className="calendar-dow">
        {DOW.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="calendar-grid">{dayCells}</div>
      {selectedDate ? (
        PERIODS.map((p) => {
          const times = timesForDate(selectedDate).filter(p.filter);
          if (times.length === 0) return null;
          return (
            <div className="period-block" key={p.title}>
              <div className="period-title">{p.title}</div>
              <div className="time-grid">
                {times.map((t, ti) => {
                  const occ = occupied(barberIdx, selectedDate, ti);
                  return (
                    <button
                      key={t}
                      type="button"
                      className={`time-slot ${selectedTime === t ? "selected" : ""}`}
                      disabled={occ}
                      onClick={() => onSelectTime(t)}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ color: "var(--ivory-dim)", fontSize: "0.85rem" }}>Selecione uma data para ver os horários.</p>
      )}
    </>
  );
}
