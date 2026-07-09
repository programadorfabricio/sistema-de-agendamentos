"use client";

import { useEffect, useRef, type RefObject } from "react";

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el.offsetParent !== null);
}

/**
 * Trap de foco + Esc para modais. Cada chamada tem seu proprio estado (via
 * useRef), diferente do utils/accessibility.js do prototipo vanilla que usava
 * variaveis de modulo — aqui varias instancias podem coexistir com seguranca.
 */
export function useFocusTrap<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  active: boolean,
  onRequestClose: () => void
) {
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  // Ref "sempre atual" pro callback — evita reexecutar o efeito principal (e
  // portanto recapturar/restaurar foco) so porque o consumidor passou uma
  // arrow function nova a cada render. Atualizada em efeito, nao durante o
  // render (mutar ref no corpo do render nao e seguro).
  const onRequestCloseRef = useRef(onRequestClose);
  useEffect(() => {
    onRequestCloseRef.current = onRequestClose;
  });

  useEffect(() => {
    if (!active) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const focusTimeoutId = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      getFocusable(container)[0]?.focus();
    }, 50);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onRequestCloseRef.current();
        return;
      }
      if (e.key === "Tab") {
        const container = containerRef.current;
        if (!container) return;
        const focusables = getFocusable(container);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimeoutId);
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedRef.current?.focus();
      lastFocusedRef.current = null;
    };
  }, [active, containerRef]);
}
