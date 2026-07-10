"use client";

import { useRef, type KeyboardEvent } from "react";

export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function activateAndFocus(id: string) {
    onChange(id);
    buttonRefs.current[id]?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const current = tabs.findIndex((t) => t.id === activeId);
    let next = current;
    if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    activateAndFocus(tabs[next].id);
  }

  return (
    <nav className="tabs" role="tablist" aria-label="Seções da barbearia" onKeyDown={handleKeyDown}>
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              buttonRefs.current[tab.id] = el;
            }}
            className={`tab-btn ${active ? "active" : ""}`}
            role="tab"
            aria-selected={active}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
