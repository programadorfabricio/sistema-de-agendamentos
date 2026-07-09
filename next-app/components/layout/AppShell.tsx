"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Tabs, type TabItem } from "./Tabs";

const TABS: TabItem[] = [
  { id: "servicos", label: "Serviços" },
  { id: "detalhes", label: "Detalhes" },
  { id: "profissionais", label: "Profissionais" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "fidelidade", label: "Fidelidade" },
];

export function AppShell() {
  const [activeTabId, setActiveTabId] = useState<string>(TABS[0].id);

  return (
    <div className="app-shell">
      <Header />
      <Tabs tabs={TABS} activeId={activeTabId} onChange={setActiveTabId} />
      <main className="panels" id="panels">
        {TABS.map((tab) => (
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
    </div>
  );
}
