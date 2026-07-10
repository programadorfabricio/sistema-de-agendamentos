"use client";

import { useReducer, useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { LoginStepChoose, type LoginProvider } from "./LoginStepChoose";
import { LoginStepPhone } from "./LoginStepPhone";
import { LoginStepCode } from "./LoginStepCode";
import { LoginStepName } from "./LoginStepName";
import { CustomerProfile } from "./CustomerProfile";
import { useAuth } from "@/contexts/AuthContext";
import { GOOGLE_NAMES, APPLE_NAMES } from "@/data/constants";

type LoginStep = "choose" | "phone" | "code" | "name";
type PhoneMethod = "whatsapp" | "telefone";

type LoginWizardState = {
  step: LoginStep;
  pendingMethod: PhoneMethod | null;
  phone: string;
  phoneError: string | null;
  code: string;
  codeError: string | null;
  name: string;
  nameError: string | null;
};

type LoginWizardAction =
  | { type: "GO_TO_STEP"; step: LoginStep; pendingMethod?: PhoneMethod }
  | { type: "SET_PHONE"; value: string }
  | { type: "SET_PHONE_ERROR"; error: string | null }
  | { type: "SET_CODE"; value: string }
  | { type: "SET_CODE_ERROR"; error: string | null }
  | { type: "SET_NAME"; value: string }
  | { type: "SET_NAME_ERROR"; error: string | null }
  | { type: "RESET" };

function createInitialWizardState(): LoginWizardState {
  return {
    step: "choose",
    pendingMethod: null,
    phone: "",
    phoneError: null,
    code: "",
    codeError: null,
    name: "",
    nameError: null,
  };
}

function loginWizardReducer(state: LoginWizardState, action: LoginWizardAction): LoginWizardState {
  switch (action.type) {
    case "GO_TO_STEP":
      return { ...state, step: action.step, pendingMethod: action.pendingMethod ?? state.pendingMethod };
    case "SET_PHONE":
      return { ...state, phone: action.value, phoneError: null };
    case "SET_PHONE_ERROR":
      return { ...state, phoneError: action.error };
    case "SET_CODE":
      return { ...state, code: action.value, codeError: null };
    case "SET_CODE_ERROR":
      return { ...state, codeError: action.error };
    case "SET_NAME":
      return { ...state, name: action.value, nameError: null };
    case "SET_NAME_ERROR":
      return { ...state, nameError: action.error };
    case "RESET":
      return createInitialWizardState();
    default:
      return state;
  }
}

function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

type LoginSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginSheet({ open, onClose }: LoginSheetProps) {
  const auth = useAuth();

  if (auth.user.loggedIn) {
    return (
      <BottomSheet
        open={open}
        onClose={onClose}
        title={auth.user.name}
        subtitle="Seu perfil"
        footer={
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              auth.logout();
              onClose();
            }}
          >
            Sair da conta
          </button>
        }
      >
        <CustomerProfile user={auth.user} onTogglePreference={auth.togglePreference} />
      </BottomSheet>
    );
  }

  return <LoginWizardSheet open={open} onClose={onClose} onLogin={auth.login} />;
}

type LoginWizardSheetProps = {
  open: boolean;
  onClose: () => void;
  onLogin: (name: string, phone: string, method: string) => void;
};

function LoginWizardSheet({ open, onClose, onLogin }: LoginWizardSheetProps) {
  const [state, dispatch] = useReducer(loginWizardReducer, undefined, createInitialWizardState);

  // Reabrir sempre comeca do zero, mesmo padrao "adjusting state during
  // render" ja usado no BookingSheet e no useDelayedUnmount do BottomSheet.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) dispatch({ type: "RESET" });
  }

  function handleSelectProvider(provider: LoginProvider) {
    if (provider === "google") {
      onLogin(randomFrom(GOOGLE_NAMES), "", "google");
      onClose();
      return;
    }
    if (provider === "apple") {
      onLogin(randomFrom(APPLE_NAMES), "", "apple");
      onClose();
      return;
    }
    dispatch({ type: "GO_TO_STEP", step: "phone", pendingMethod: provider });
  }

  function handlePhoneSubmit() {
    if (!state.phone.trim()) {
      dispatch({ type: "SET_PHONE_ERROR", error: "Informe seu número de telefone" });
      return;
    }
    dispatch({ type: "GO_TO_STEP", step: "code" });
  }

  function handleCodeSubmit() {
    if (state.code.trim().length !== 4) {
      dispatch({ type: "SET_CODE_ERROR", error: "Digite os 4 dígitos do código" });
      return;
    }
    dispatch({ type: "GO_TO_STEP", step: "name" });
  }

  function handleNameSubmit() {
    if (!state.name.trim()) {
      dispatch({ type: "SET_NAME_ERROR", error: "Informe seu nome" });
      return;
    }
    onLogin(state.name.trim(), state.phone.trim(), state.pendingMethod ?? "");
    onClose();
  }

  const title =
    state.step === "phone"
      ? state.pendingMethod === "whatsapp"
        ? "WhatsApp"
        : "Telefone"
      : state.step === "code"
        ? "Verificação"
        : state.step === "name"
          ? "Quase lá"
          : "Entrar";

  const subtitle =
    state.step === "phone"
      ? "Informe seu número"
      : state.step === "code"
        ? `Código enviado para ${state.phone}`
        : state.step === "name"
          ? "Como podemos te chamar?"
          : "Acesse sua conta";

  const footer =
    state.step === "choose" ? null : (
      <button
        className="btn btn-primary"
        type="button"
        onClick={state.step === "phone" ? handlePhoneSubmit : state.step === "code" ? handleCodeSubmit : handleNameSubmit}
      >
        {state.step === "phone" ? "Enviar código" : state.step === "code" ? "Confirmar" : "Concluir cadastro"}
      </button>
    );

  return (
    <BottomSheet open={open} onClose={onClose} title={title} subtitle={subtitle} footer={footer}>
      {state.step === "choose" && <LoginStepChoose onSelectProvider={handleSelectProvider} />}
      {state.step === "phone" && (
        <LoginStepPhone
          value={state.phone}
          error={state.phoneError}
          onChange={(value) => dispatch({ type: "SET_PHONE", value })}
          onBack={() => dispatch({ type: "GO_TO_STEP", step: "choose" })}
        />
      )}
      {state.step === "code" && (
        <LoginStepCode
          value={state.code}
          error={state.codeError}
          onChange={(value) => dispatch({ type: "SET_CODE", value })}
          onBack={() => dispatch({ type: "GO_TO_STEP", step: "phone" })}
        />
      )}
      {state.step === "name" && (
        <LoginStepName
          value={state.name}
          error={state.nameError}
          onChange={(value) => dispatch({ type: "SET_NAME", value })}
        />
      )}
    </BottomSheet>
  );
}
