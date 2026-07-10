"use client";

import { money } from "@/lib/formatCurrency";
import type { Service } from "@/types/service";

type ServiceCardProps = {
  service: Service;
  selected: boolean;
  favorite: boolean;
  onToggleSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onAgendar: (service: Service) => void;
};

export function ServiceCard({ service, selected, favorite, onToggleSelect, onToggleFavorite, onAgendar }: ServiceCardProps) {
  return (
    <div className="service-row">
      <button
        type="button"
        className={`svc-select ${selected ? "selected" : ""}`}
        aria-pressed={selected}
        aria-label={`Selecionar ${service.name} para agendar junto com outros serviços`}
        onClick={() => onToggleSelect(service.id)}
      />
      <div className="svc-icon">{service.icon}</div>
      <div className="svc-info">
        <div className="svc-name">{service.name}</div>
        <div className="svc-desc">{service.desc}</div>
        <div className="svc-meta">
          <span className="svc-price">{money(service.price)}</span>
          <span className="svc-duration">⏱ {service.duration} min</span>
        </div>
      </div>
      <div className="svc-actions">
        <button
          type="button"
          className={`svc-fav ${favorite ? "active" : ""}`}
          aria-pressed={favorite}
          aria-label={favorite ? `Remover ${service.name} dos favoritos` : `Adicionar ${service.name} aos favoritos`}
          onClick={() => onToggleFavorite(service.id)}
        >
          {favorite ? "♥" : "♡"}
        </button>
        <button type="button" className="svc-agendar" onClick={() => onAgendar(service)}>
          Agendar
        </button>
      </div>
    </div>
  );
}
