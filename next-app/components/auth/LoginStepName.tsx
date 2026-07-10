"use client";

type LoginStepNameProps = {
  value: string;
  error: string | null;
  onChange: (value: string) => void;
};

export function LoginStepName({ value, error, onChange }: LoginStepNameProps) {
  return (
    <div className="field">
      <label htmlFor="loginNameInput">Seu nome</label>
      <input
        id="loginNameInput"
        type="text"
        placeholder="Seu nome"
        value={value}
        className={error ? "error" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "loginNameInput-error" : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? (
        <p id="loginNameInput-error" className="field-error" role="alert">
          ⚠ {error}
        </p>
      ) : null}
    </div>
  );
}
