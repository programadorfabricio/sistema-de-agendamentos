"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Tabs, type TabItem } from "./Tabs";
import { ServicosPanel } from "@/components/catalog/ServicosPanel";
import { DetalhesPanel } from "@/components/catalog/DetalhesPanel";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { LoginSheet } from "@/components/auth/LoginSheet";
import { StaffSheet } from "@/components/staff/StaffSheet";
import { ProfissionaisPanel } from "@/components/professionals/ProfissionaisPanel";
import { AvaliacoesPanel } from "@/components/reviews/AvaliacoesPanel";
import { FidelidadePanel } from "@/components/loyalty/FidelidadePanel";
import { useAuth } from "@/contexts/AuthContext";
import type { BookableService } from "@/types/service";

const TABS: TabItem[] = [
  { id: "servicos", label: "Serviços" },
  { id: "detalhes", label: "Detalhes" },
  { id: "profissionais", label: "Profissionais" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "fidelidade", label: "Fidelidade" },
];

export function AppShell() {
  const [activeTabId, setActiveTabId] = useState<string>(TABS[0].id);
  const [bookingService, setBookingService] = useState<BookableService | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectionResetToken, setSelectionResetToken] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const auth = useAuth();

  function openBooking(service: BookableService) {
    setBookingService(service);
    setBookingOpen(true);
  }

  return (
    <div className="app-shell">
      <Header onProfileClick={() => setLoginOpen(true)} />
      <Tabs tabs={TABS} activeId={activeTabId} onChange={setActiveTabId} />
      <main className="panels" id="panels">
        <ServicosPanel
          active={activeTabId === "servicos"}
          onAgendar={openBooking}
          clearSelectionSignal={selectionResetToken}
        />
        <DetalhesPanel active={activeTabId === "detalhes"} onOpenStaffDemo={() => setStaffOpen(true)} />
        <ProfissionaisPanel active={activeTabId === "profissionais"} />
        <AvaliacoesPanel active={activeTabId === "avaliacoes"} />
        <FidelidadePanel active={activeTabId === "fidelidade"} />
      </main>
      <BookingSheet
        service={bookingService}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onBookingConfirmed={() => setSelectionResetToken((n) => n + 1)}
        prefillName={auth.user.loggedIn ? auth.user.name : ""}
        prefillPhone={auth.user.loggedIn ? auth.user.phone : ""}
      />
      <LoginSheet open={loginOpen} onClose={() => setLoginOpen(false)} />
      <StaffSheet open={staffOpen} onClose={() => setStaffOpen(false)} />
    </div>
  );
}
