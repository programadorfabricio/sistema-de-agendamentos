"use client";

import { money } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import type { Barber } from "@/types/barber";
import type { BookableService } from "@/types/service";

type BookingStepDetailsProps = {
  service: BookableService;
  barber: Barber;
  date: Date;
  time: string;
  name: string;
  phone: string;
  nameError: string | null;
  phoneError: string | null;
  onChangeName: (name: string) => void;
  onChangePhone: (phone: string) => void;
};

export function BookingStepDetails({
  service,
  barber,
  date,
  time,
  name,
  phone,
  nameError,
  phoneError,
  onChangeName,
  onChangePhone,
}: BookingStepDetailsProps) {
  return (
    <>
      <div className="step-heading">
        <h2>Seus dados</h2>
        <p>Confirme as informações para reservar.</p>
      </div>
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
        <div className="row">
          <span className="label">Valor</span>
          <span className="val">{money(service.price)}</span>
        </div>
      </div>
      <div className="field">
        <label htmlFor="nameInput">Nome completo</label>
        <input
          id="nameInput"
          type="text"
          placeholder="Seu nome"
          value={name}
          className={nameError ? "error" : undefined}
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "nameInput-error" : undefined}
          onChange={(e) => onChangeName(e.target.value)}
        />
        {nameError ? (
          <p id="nameInput-error" className="field-error" role="alert">
            ⚠ {nameError}
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="phoneInput">WhatsApp</label>
        <input
          id="phoneInput"
          type="tel"
          placeholder="(19) 99999-0000"
          value={phone}
          className={phoneError ? "error" : undefined}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? "phoneInput-error" : undefined}
          onChange={(e) => onChangePhone(e.target.value)}
        />
        {phoneError ? (
          <p id="phoneInput-error" className="field-error" role="alert">
            ⚠ {phoneError}
          </p>
        ) : null}
      </div>
    </>
  );
}
