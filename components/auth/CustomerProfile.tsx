"use client";

import Image from "next/image";
import { PREFERENCE_OPTIONS } from "@/data/constants";
import { money } from "@/lib/formatCurrency";
import { fmtShortDate } from "@/lib/formatDate";
import { calculateSpent } from "@/lib/calculateSpent";
import { calculateFavoriteBarber } from "@/lib/calculateFavoriteBarber";
import { calculateFrequency } from "@/lib/calculateFrequency";
import type { AuthUser } from "@/types/user";

const METHOD_LABELS: Record<string, string> = { google: "Google", apple: "Apple" };

type CustomerProfileProps = {
  user: AuthUser;
  onTogglePreference: (pref: string) => void;
};

export function CustomerProfile({ user, onTogglePreference }: CustomerProfileProps) {
  const stats = user.history.length
    ? {
        total: calculateSpent(user.history),
        favBarber: calculateFavoriteBarber(user.history),
        avgGap: calculateFrequency(user.history),
        last: user.history[0],
      }
    : null;

  return (
    <>
      <div className="profile-head">
        <Image
          src={user.photo}
          alt=""
          width={64}
          height={64}
          placeholder="empty"
          className="profile-photo"
        />
        <div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-sub">{user.phone || `Login via ${METHOD_LABELS[user.method] ?? user.method}`}</div>
        </div>
      </div>

      {stats ? (
        <>
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
        </>
      ) : null}

      <div className="cat-label">Suas preferências</div>
      <div className="pref-chips">
        {PREFERENCE_OPTIONS.map((p) => (
          <button
            key={p}
            type="button"
            className={`cat-chip ${user.preferences.has(p) ? "active" : ""}`}
            onClick={() => onTogglePreference(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {stats ? (
        <>
          <div className="cat-label">Histórico de cortes</div>
          <div className="history-list">
            {user.history.map((h, i) => (
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
        </>
      ) : null}
    </>
  );
}
