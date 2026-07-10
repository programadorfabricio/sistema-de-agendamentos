"use client";

import { money } from "@/lib/formatCurrency";
import { fmtShortDate } from "@/lib/formatDate";
import { calculateSpent } from "@/lib/calculateSpent";
import { initials } from "@/lib/text";
import type { Client } from "@/types/client";

type StaffClientListProps = {
  clients: Client[];
  onSelect: (id: string) => void;
};

export function StaffClientList({ clients, onSelect }: StaffClientListProps) {
  return (
    <>
      {clients.map((c) => {
        const total = calculateSpent(c.history);
        const last = c.history[0];
        return (
          <button key={c.id} type="button" className="staff-client-row" onClick={() => onSelect(c.id)}>
            <div className="avatar">{initials(c.name)}</div>
            <div>
              <div className="name">{c.name}</div>
              <div className="meta">
                Último corte: {fmtShortDate(last.date)} · {money(total)} gastos
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
}
