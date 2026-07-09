"use client";

export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: TabItem[];
  activeId: string;
  onChange?: (id: string) => void;
};

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <nav className="tabs" role="tablist" aria-label="Seções da barbearia">
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            className={`tab-btn ${active ? "active" : ""}`}
            role="tab"
            aria-selected={active}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange?.(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
