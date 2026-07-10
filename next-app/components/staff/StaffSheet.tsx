"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Dashboard } from "./Dashboard";
import { StaffClientList } from "./StaffClientList";
import { StaffClientDetail } from "./StaffClientDetail";
import { CLIENTS_MOCK, STAFF_DASHBOARD } from "@/data/customers-mock";
import type { Client } from "@/types/client";

const DEMO_BANNER = (
  <div className="demo-badge">
    <span className="dot" />
    <div>
      <strong>Modo demonstração</strong>
      <span>Dados simulados</span>
    </div>
  </div>
);

type StaffSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function StaffSheet({ open, onClose }: StaffSheetProps) {
  // Diferente do Booking/Login, as edicoes (notas/quick notes) NAO resetam ao
  // reabrir o sheet — precisam durar a sessao inteira, igual a mutacao direta
  // do CLIENTS_MOCK no prototipo vanilla. So a navegacao lista<->ficha reseta.
  const [clients, setClients] = useState<Client[]>(CLIENTS_MOCK);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setSelectedClientId(null);
  }

  const selectedClient = clients.find((c) => c.id === selectedClientId) ?? null;

  function updateClient(id: string, updater: (client: Client) => Client) {
    setClients((prev) => prev.map((c) => (c.id === id ? updater(c) : c)));
  }

  function toggleQuickNote(clientId: string, note: string) {
    updateClient(clientId, (c) => ({
      ...c,
      quickNotes: c.quickNotes.includes(note) ? c.quickNotes.filter((n) => n !== note) : [...c.quickNotes, note],
    }));
  }

  function changeNotes(clientId: string, notes: string) {
    updateClient(clientId, (c) => ({ ...c, notes }));
  }

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Área do barbeiro"
      subtitle={selectedClient ? "Ficha do cliente" : `${clients.length} clientes cadastrados`}
      banner={DEMO_BANNER}
    >
      {selectedClient ? (
        <StaffClientDetail
          client={selectedClient}
          onBack={() => setSelectedClientId(null)}
          onToggleQuickNote={(note) => toggleQuickNote(selectedClient.id, note)}
          onChangeNotes={(notes) => changeNotes(selectedClient.id, notes)}
        />
      ) : (
        <>
          <Dashboard stats={STAFF_DASHBOARD} />
          <div className="cat-label">Clientes</div>
          <StaffClientList clients={clients} onSelect={setSelectedClientId} />
        </>
      )}
    </BottomSheet>
  );
}
