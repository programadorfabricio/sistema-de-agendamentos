"use client";

import { money } from "@/lib/formatCurrency";
import { formatDurationLabel } from "@/lib/formatDuration";
import type { Service } from "@/types/service";

type MultiSelectBarProps = {
  selectedServices: Service[];
  onContinue: () => void;
};

export function MultiSelectBar({ selectedServices, onContinue }: MultiSelectBarProps) {
  if (selectedServices.length === 0) return null;

  const count = selectedServices.length;
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  const hasUnknownPrice = selectedServices.some((s) => s.price === null);
  const totalPrice = selectedServices.reduce((sum, s) => sum + (s.price || 0), 0);

  return (
    <div className="multi-select-bar visible">
      <div className="msb-info">
        <strong>
          {count} serviço{count > 1 ? "s" : ""} selecionado{count > 1 ? "s" : ""}
        </strong>
        <span>
          ⏱ {formatDurationLabel(totalDuration)} total · {hasUnknownPrice ? "a partir de " : ""}
          {money(totalPrice)}
        </span>
      </div>
      <button className="btn btn-primary" type="button" onClick={onContinue}>
        Agendar selecionados
      </button>
    </div>
  );
}
