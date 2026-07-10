"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";

// Deve bater com "transition: transform .3s ease" do .sheet em styles/sheets.css —
// e o tempo que esperamos antes de desmontar pra deixar a animacao de saida rodar.
const EXIT_DURATION_MS = 300;

function useDelayedUnmount(open: boolean, exitDurationMs: number): boolean {
  const [shouldRender, setShouldRender] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);

  // Reabrir e sincrono (padrao "adjusting state during render" do React) —
  // so o fechamento precisa de um efeito de verdade, porque so ele depende
  // de um timer (esperar a animacao de saida antes de desmontar).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setShouldRender(true);
  }

  useEffect(() => {
    if (open || !shouldRender) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeoutId = setTimeout(() => setShouldRender(false), prefersReducedMotion ? 0 : exitDurationMs);
    return () => clearTimeout(timeoutId);
  }, [open, shouldRender, exitDurationMs]);

  return shouldRender;
}

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  /** 0-100. Quando definido, mostra a barra de progresso do wizard entre o header e o corpo. */
  progress?: number;
  /** Conteudo fixo entre o header e o corpo (ex.: selo "Modo demonstração"), fora da area com scroll. */
  banner?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export function BottomSheet({ open, onClose, title, subtitle, progress, banner, footer, children }: BottomSheetProps) {
  const shouldRender = useDelayedUnmount(open, EXIT_DURATION_MS);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useScrollLock(open);
  useFocusTrap(overlayRef, open, onClose);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className="sheet-overlay"
      style={{ display: "flex" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet" style={{ transform: open ? "translateY(0)" : "translateY(100%)" }}>
        <div className="sheet-handle" />
        <div className="sheet-head">
          <div>
            <div className="title" id={titleId}>
              {title}
            </div>
            {subtitle ? <div className="sub">{subtitle}</div> : null}
          </div>
          <button className="sheet-close" aria-label="Fechar" type="button" onClick={onClose}>
            ✕
          </button>
        </div>
        {banner}
        {progress !== undefined ? (
          <div className="sheet-progress">
            <div className="sheet-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        ) : null}
        <div className="sheet-body">{children}</div>
        {footer ? <div className="sheet-foot">{footer}</div> : null}
      </div>
    </div>
  );
}
