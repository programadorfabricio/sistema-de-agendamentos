"use client";

import { money } from "@/lib/formatCurrency";
import type { Barber } from "@/types/barber";
import type { BookableService } from "@/types/service";

type BookingStepBarberProps = {
  service: BookableService;
  barbers: Barber[];
  selectedIdx: number | null;
  onSelect: (idx: number) => void;
};

export function BookingStepBarber({ service, barbers, selectedIdx, onSelect }: BookingStepBarberProps) {
  return (
    <>
      <div className="step-heading">
        <h2>Escolha o profissional</h2>
        <p>
          {service.name} · {money(service.price)} · {service.duration} min
        </p>
      </div>
      <div className="barber-list">
        {barbers.map((b, idx) => (
          <button
            key={b.id}
            type="button"
            className={`barber-select-row ${selectedIdx === idx ? "selected" : ""}`}
            onClick={() => onSelect(idx)}
          >
            <img src={b.photo} alt="" />
            <div>
              <div className="name">{b.name}</div>
              <div className="role">{b.role}</div>
            </div>
            <div className="check">✓</div>
          </button>
        ))}
      </div>
    </>
  );
}
