"use client";

type LoginStepPhoneProps = {
  value: string;
  error: string | null;
  onChange: (value: string) => void;
  onBack: () => void;
};

export function LoginStepPhone({ value, error, onChange, onBack }: LoginStepPhoneProps) {
  return (
    <>
      <button className="login-back" type="button" onClick={onBack}>
        ‹ Voltar
      </button>
      <div className="field">
        <label htmlFor="loginPhoneInput">Número de telefone</label>
        <input
          id="loginPhoneInput"
          type="tel"
          placeholder="(19) 99999-0000"
          value={value}
          className={error ? "error" : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "loginPhoneInput-error" : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        {error ? (
          <p id="loginPhoneInput-error" className="field-error" role="alert">
            ⚠ {error}
          </p>
        ) : null}
      </div>
    </>
  );
}
