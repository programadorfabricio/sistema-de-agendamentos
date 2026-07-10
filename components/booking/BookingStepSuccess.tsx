"use client";

import { formatDate } from "@/lib/formatDate";
import type { Barber } from "@/types/barber";
import type { BookableService } from "@/types/service";

type BookingStepSuccessProps = {
  service: BookableService;
  barber: Barber;
  date: Date;
  time: string;
  whatsappLink: string;
};

export function BookingStepSuccess({ service, barber, date, time, whatsappLink }: BookingStepSuccessProps) {
  return (
    <div className="success">
      <div className="mark">✓</div>
      <h2>Horário reservado</h2>
      <p>Confirme seu agendamento no WhatsApp para garantir o horário.</p>
      <div className="summary-card">
        <div className="row">
          <img src={barber.photo} alt="" />
          <span>{barber.name}</span>
        </div>
        <div className="row">
          <span className="label">Serviço</span>
          <span className="val">{service.name}</span>
        </div>
        <div className="row">
          <span className="label">Dia</span>
          <span className="val">{formatDate(date)}</span>
        </div>
        <div className="row">
          <span className="label">Horário</span>
          <span className="val">{time}</span>
        </div>
      </div>
      {/* Manual so — nao dispara sozinho ao chegar nesta tela (correcao ja
          validada no prototipo vanilla: abrir automatico assustava no iPhone). */}
      <button className="btn whatsapp-btn" type="button" onClick={() => window.open(whatsappLink, "_blank")}>
        Abrir WhatsApp ↗
      </button>
    </div>
  );
}
