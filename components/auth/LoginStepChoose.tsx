"use client";

export type LoginProvider = "google" | "apple" | "whatsapp" | "telefone";

type LoginStepChooseProps = {
  onSelectProvider: (provider: LoginProvider) => void;
};

export function LoginStepChoose({ onSelectProvider }: LoginStepChooseProps) {
  return (
    <>
      <div className="login-options">
        <button className="login-option-btn" type="button" onClick={() => onSelectProvider("google")}>
          <span className="provider-icon google">G</span> Continuar com Google
        </button>
        <button className="login-option-btn" type="button" onClick={() => onSelectProvider("apple")}>
          <span className="provider-icon apple">🍎</span> Continuar com Apple
        </button>
        <button className="login-option-btn" type="button" onClick={() => onSelectProvider("whatsapp")}>
          <span className="provider-icon whatsapp">💬</span> Continuar com WhatsApp
        </button>
        <button className="login-option-btn" type="button" onClick={() => onSelectProvider("telefone")}>
          <span className="provider-icon telefone">📱</span> Continuar com telefone
        </button>
      </div>
      <p className="login-disclaimer">
        Este é um protótipo de front-end — o login aqui é simulado, sem autenticação real.
      </p>
    </>
  );
}
