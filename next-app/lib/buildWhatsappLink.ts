import { BUSINESS_WHATSAPP } from "@/data/constants";
import { formatDate } from "./formatDate";
import { money } from "./formatCurrency";
import type { Barber } from "@/types/barber";
import type { BookableService } from "@/types/service";

type BuildWhatsappLinkParams = {
  service: BookableService;
  barber: Barber;
  date: Date;
  time: string;
  name: string;
  phone: string;
};

export function buildWhatsappLink({ service, barber, date, time, name, phone }: BuildWhatsappLinkParams): string {
  const msg =
    `Olá! Gostaria de confirmar meu agendamento na Navalha & Ofício:\n\n` +
    `Serviço: ${service.name}\n` +
    `Profissional: ${barber.name}\n` +
    `Dia: ${formatDate(date)}\n` +
    `Horário: ${time}\n` +
    `Valor: ${money(service.price)}\n\n` +
    `Nome: ${name}\n` +
    `Telefone: ${phone}`;
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
