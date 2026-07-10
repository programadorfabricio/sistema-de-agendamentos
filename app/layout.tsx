import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Navalha & Ofício — Agendar",
};

// Mantenha a chave "navalha-theme" e a lógica de fallback em sincronia com
// getPreferredTheme() em contexts/ThemeContext.tsx — os dois lêem a mesma fonte
// para o React não hidratar com um tema diferente do que este script já aplicou.
// Sem preferência salva, o fallback é sempre "dark" — de propósito, não segue o
// prefers-color-scheme do sistema.
const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("navalha-theme");var t=(s==="light"||s==="dark")?s:"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- rule targets Pages Router; this is the App Router root layout, the correct single place for a global font link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <FavoritesProvider>
            <AuthProvider>{children}</AuthProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
