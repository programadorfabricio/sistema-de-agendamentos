"use client";

type LoginStepCodeProps = {
  value: string;
  error: string | null;
  onChange: (value: string) => void;
  onBack: () => void;
};

export function LoginStepCode({ value, error, onChange, onBack }: LoginStepCodeProps) {
  return (
    <>
      <button className="login-back" type="button" onClick={onBack}>
        ‹ Voltar
      </button>
      <div className="field">
        <label htmlFor="loginCodeInput">Código de 4 dígitos</label>
        <input
          id="loginCodeInput"
          className={`code-input ${error ? "error" : ""}`}
          type="text"
          inputMode="numeric"
          maxLength={4}
          placeholder="0000"
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "loginCodeInput-error" : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        {error ? (
          <p id="loginCodeInput-error" className="field-error" role="alert">
            ⚠ {error}
          </p>
        ) : null}
      </div>
      <p className="login-disclaimer">Simulação: digite qualquer código de 4 números para continuar.</p>
    </>
  );
}
