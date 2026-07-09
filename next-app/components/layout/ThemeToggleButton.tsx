"use client";

import { useId } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { InlineScript } from "@/components/ui/InlineScript";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const id = useId();

  return (
    <>
      <button
        type="button"
        id={id}
        className="icon-btn"
        aria-label={theme === "light" ? "Mudar para tema escuro" : "Mudar para tema claro"}
        onClick={toggleTheme}
        suppressHydrationWarning
      >
        {theme === "light" ? "☀️" : "🌙"}
      </button>
      {/* Corrige o icone/aria-label antes da hidratacao, lendo o data-theme que o
          script no <head> ja aplicou — evita herdar o "dark" chutado no SSR. */}
      <InlineScript
        html={`{var b=document.getElementById(${JSON.stringify(id)});if(b){var light=document.documentElement.getAttribute("data-theme")==="light";b.textContent=light?"☀️":"🌙";b.setAttribute("aria-label",light?"Mudar para tema escuro":"Mudar para tema claro");}}`}
      />
    </>
  );
}
