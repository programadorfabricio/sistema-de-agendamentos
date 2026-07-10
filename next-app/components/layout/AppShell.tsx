"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Tabs, type TabItem } from "./Tabs";
import { ServicosPanel } from "@/components/catalog/ServicosPanel";
import { BookingSheet } from "@/components/booking/BookingSheet";
import type { BookableService } from "@/types/service";

const TABS: TabItem[] = [
  { id: "servicos", label: "Serviços" },
  { id: "detalhes", label: "Detalhes" },
  { id: "profissionais", label: "Profissionais" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "fidelidade", label: "Fidelidade" },
];

const PLACEHOLDER_TABS = TABS.filter((tab) => tab.id !== "servicos");

export function AppShell() {
  const [activeTabId, setActiveTabId] = useState<string>(TABS[0].id);
  const [bookingService, setBookingService] = useState<BookableService | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectionResetToken, setSelectionResetToken] = useState(0);

  function openBooking(service: BookableService) {
    setBookingService(service);
    setBookingOpen(true);
  }

  return (
    <div className="app-shell">
      <Header />
      <Tabs tabs={TABS} activeId={activeTabId} onChange={setActiveTabId} />
      <main className="panels" id="panels">
        <ServicosPanel
          active={activeTabId === "servicos"}
          onAgendar={openBooking}
          clearSelectionSignal={selectionResetToken}
        />
        {PLACEHOLDER_TABS.map((tab) => (
          <div
            key={tab.id}
            className={`panel ${tab.id === activeTabId ? "active" : ""}`}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
          >
            <p className="empty-state">Painel &ldquo;{tab.label}&rdquo; — em construção.</p>
          </div>
        ))}
      </main>
      <BookingSheet
        service={bookingService}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onBookingConfirmed={() => setSelectionResetToken((n) => n + 1)}
      />
    </div>
  );
}
