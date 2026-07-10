"use client";

import { STAFF_QUICK_NOTES } from "@/data/constants";
import { money } from "@/lib/formatCurrency";
import { fmtShortDate } from "@/lib/formatDate";
import { calculateSpent } from "@/lib/calculateSpent";
import { calculateFavoriteBarber } from "@/lib/calculateFavoriteBarber";
import { calculateFrequency } from "@/lib/calculateFrequency";
import { initials } from "@/lib/text";
import type { Client } from "@/types/client";

type StaffClientDetailProps = {
  client: Client;
  onBack: () => void;
  onToggleQuickNote: (note: string) => void;
  onChangeNotes: (notes: string) => void;
};

export function StaffClientDetail({ client, onBack, onToggleQuickNote, onChangeNotes }: StaffClientDetailProps) {
  const stats = {
    total: calculateSpent(client.history),
    favBarber: calculateFavoriteBarber(client.history),
    avgGap: calculateFrequency(client.history),
    last: client.history[0],
  };

  return (
    <>
      <button className="back-inline" type="button" onClick={onBack}>
        ‹ Todos os clientes
      </button>
      <div className="profile-head">
        <div
          className="avatar"
          style={{
            width: 64,
            height: 64,
            fontSize: "1.1rem",
            borderRadius: "50%",
            background: "var(--brass-soft)",
            color: "var(--brass)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {initials(client.name)}
        </div>
        <div>
          <div className="profile-name">{client.name}</div>
        </div>
      </div>
      <div className="profile-stats">
        <div className="profile-stat">
          <span className="v">{fmtShortDate(stats.last.date)}</span>
          <span className="l">Último corte</span>
        </div>
        <div className="profile-stat">
          <span className="v">{stats.avgGap ? `${stats.avgGap} dias` : "—"}</span>
          <span className="l">Frequência média</span>
        </div>
        <div className="profile-stat">
          <span className="v">{money(stats.total)}</span>
          <span className="l">Total gasto</span>
        </div>
      </div>
      <div className="summary-card" style={{ marginBottom: 18 }}>
        <div className="row">
          <span className="label">Barbeiro favorito</span>
          <span className="val">{stats.favBarber}</span>
        </div>
      </div>

      <div className="cat-label">Preferências</div>
      <div className="pref-chips">
        {client.preferences.length ? (
          client.preferences.map((p) => (
            <span key={p} className="cat-chip active" style={{ pointerEvents: "none" }}>
              {p}
            </span>
          ))
        ) : (
          <span style={{ color: "var(--ivory-dim)", fontSize: "0.82rem" }}>Nenhuma preferência registrada.</span>
        )}
      </div>

      <div className="cat-label">Histórico de cortes</div>
      <div className="history-list">
        {client.history.map((h, i) => (
          <div className="history-row" key={i}>
            <div>
              <div className="history-service">{h.service}</div>
              <div className="history-meta">
                {h.barber} · {fmtShortDate(h.date)}
              </div>
            </div>
            <div className="history-price">{money(h.price)}</div>
          </div>
        ))}
      </div>

      <div className="cat-label">
        Observações do barbeiro{" "}
        <span style={{ color: "var(--ivory-dim)", textTransform: "none", letterSpacing: 0 }}>
          (privado — cliente não vê)
        </span>
      </div>
      <div className="quick-notes">
        {STAFF_QUICK_NOTES.map((q) => (
          <label className="quick-note-item" key={q}>
            <input type="checkbox" checked={client.quickNotes.includes(q)} onChange={() => onToggleQuickNote(q)} />
            <span>{q}</span>
          </label>
        ))}
      </div>
      <div className="field">
        <textarea
          className="staff-notes-textarea"
          placeholder="Anotações sobre o cliente..."
          value={client.notes}
          onChange={(e) => onChangeNotes(e.target.value)}
        />
      </div>
    </>
  );
}
