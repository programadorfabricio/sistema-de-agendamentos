"use client";

import type { Category } from "@/types/service";

type CategoryChipsProps = {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function CategoryChips({ categories, activeId, onSelect }: CategoryChipsProps) {
  return (
    <div className="cat-scroller">
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          className={`cat-chip ${activeId === c.id ? "active" : ""}`}
          onClick={() => onSelect(c.id)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
