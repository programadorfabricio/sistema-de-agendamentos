"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchBox } from "./SearchBox";
import { CategoryChips } from "./CategoryChips";
import { ServiceCard } from "./ServiceCard";
import { MultiSelectBar } from "./MultiSelectBar";
import { CATEGORIES, SERVICES } from "@/data/services";
import { useFavorites } from "@/contexts/FavoritesContext";
import { buildCombinedService } from "@/lib/buildCombinedService";
import type { BookableService } from "@/types/service";

const SKELETON_COUNT = 4;
const SIMULATED_LOAD_MS = 650;

type ServicosPanelProps = {
  active: boolean;
  onAgendar: (service: BookableService) => void;
  /** Muda de valor pra sinalizar "limpa a selecao" (ex.: apos confirmar um agendamento). */
  clearSelectionSignal?: number;
};

export function ServicosPanel({ active, onAgendar, clearSelectionSignal }: ServicosPanelProps) {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(false), SIMULATED_LOAD_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  const [prevClearSignal, setPrevClearSignal] = useState(clearSelectionSignal);
  if (clearSelectionSignal !== prevClearSignal) {
    setPrevClearSignal(clearSelectionSignal);
    if (selectedIds.size > 0) setSelectedIds(new Set());
  }

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return SERVICES.filter((s) => {
      const matchCat =
        activeCategory === "todos" || (activeCategory === "favoritos" ? favorites.has(s.id) : s.cat === activeCategory);
      const matchSearch = !term || s.name.toLowerCase().includes(term) || s.desc.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchTerm, favorites]);

  const selectedServices = useMemo(() => SERVICES.filter((s) => selectedIds.has(s.id)), [selectedIds]);

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleContinueSelected() {
    if (selectedServices.length === 0) return;
    onAgendar(buildCombinedService(selectedServices));
  }

  return (
    <>
      <div
        className={`panel ${active ? "active" : ""}`}
        id="panel-servicos"
        role="tabpanel"
        aria-labelledby="tab-servicos"
        style={selectedServices.length > 0 ? { paddingBottom: "86px" } : undefined}
      >
        <SearchBox value={searchTerm} onChange={setSearchTerm} />
        <div className="cat-label">Categorias</div>
        <CategoryChips categories={CATEGORIES} activeId={activeCategory} onSelect={setActiveCategory} />

        {loading ? (
          <div>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div className="service-row" key={i}>
                <div className="skeleton skel-avatar" />
                <div className="svc-info">
                  <div className="skeleton skel-line medium" style={{ marginBottom: 8 }} />
                  <div className="skeleton skel-line long" style={{ marginBottom: 10 }} />
                  <div className="skeleton skel-line short" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            {activeCategory === "favoritos" ? "Você ainda não favoritou nenhum serviço." : "Nenhum serviço encontrado."}
          </div>
        ) : (
          <div>
            {filtered.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                selected={selectedIds.has(s.id)}
                favorite={favorites.has(s.id)}
                onToggleSelect={toggleSelect}
                onToggleFavorite={toggleFavorite}
                onAgendar={onAgendar}
              />
            ))}
          </div>
        )}
      </div>
      <MultiSelectBar selectedServices={selectedServices} onContinue={handleContinueSelected} />
    </>
  );
}
