"use client";

import { useReducer, useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { BookingStepBarber } from "./BookingStepBarber";
import { BookingStepDateTime } from "./BookingStepDateTime";
import { BookingStepDetails } from "./BookingStepDetails";
import { BookingStepSuccess } from "./BookingStepSuccess";
import { BARBERS } from "@/data/barbers";
import { buildWhatsappLink } from "@/lib/buildWhatsappLink";
import type { BookableService } from "@/types/service";

type BookingStep = 0 | 1 | 2 | 3;

type BookingState = {
  service: BookableService;
  step: BookingStep;
  barberIdx: number | null;
  date: Date | null;
  time: string | null;
  name: string;
  phone: string;
  nameError: string | null;
  phoneError: string | null;
  calYear: number;
  calMonth: number;
};

type BookingAction =
  | { type: "SELECT_BARBER"; barberIdx: number }
  | { type: "SELECT_DATE"; date: Date }
  | { type: "SELECT_TIME"; time: string }
  | { type: "SET_NAME"; name: string }
  | { type: "SET_PHONE"; phone: string }
  | { type: "SET_FIELD_ERRORS"; nameError: string | null; phoneError: string | null }
  | { type: "NAV_MONTH"; direction: -1 | 1 }
  | { type: "GO_TO_STEP"; step: BookingStep }
  | { type: "CONFIRM" }
  | { type: "RESET"; service: BookableService; name: string; phone: string; today: Date };

const EMPTY_SERVICE: BookableService = { id: "", name: "", price: null, duration: 0 };

function createInitialState(service: BookableService, name: string, phone: string, today: Date): BookingState {
  return {
    service,
    step: 0,
    barberIdx: null,
    date: null,
    time: null,
    name,
    phone,
    nameError: null,
    phoneError: null,
    calYear: today.getFullYear(),
    calMonth: today.getMonth(),
  };
}

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SELECT_BARBER":
      return { ...state, barberIdx: action.barberIdx };
    case "SELECT_DATE":
      return { ...state, date: action.date, time: null };
    case "SELECT_TIME":
      return { ...state, time: action.time };
    case "SET_NAME":
      return { ...state, name: action.name, nameError: null };
    case "SET_PHONE":
      return { ...state, phone: action.phone, phoneError: null };
    case "SET_FIELD_ERRORS":
      return { ...state, nameError: action.nameError, phoneError: action.phoneError };
    case "NAV_MONTH": {
      let calMonth = state.calMonth + action.direction;
      let calYear = state.calYear;
      if (calMonth < 0) {
        calMonth = 11;
        calYear -= 1;
      } else if (calMonth > 11) {
        calMonth = 0;
        calYear += 1;
      }
      return { ...state, calMonth, calYear };
    }
    case "GO_TO_STEP":
      return { ...state, step: action.step };
    case "CONFIRM":
      return { ...state, step: 3, nameError: null, phoneError: null };
    case "RESET":
      return createInitialState(action.service, action.name, action.phone, action.today);
    default:
      return state;
  }
}

type BookingSheetProps = {
  service: BookableService | null;
  open: boolean;
  onClose: () => void;
  onBookingConfirmed?: () => void;
  prefillName?: string;
  prefillPhone?: string;
};

export function BookingSheet({
  service,
  open,
  onClose,
  onBookingConfirmed,
  prefillName = "",
  prefillPhone = "",
}: BookingSheetProps) {
  const [today] = useState(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  });
  const [state, dispatch] = useReducer(bookingReducer, undefined, () =>
    createInitialState(service ?? EMPTY_SERVICE, prefillName, prefillPhone, today)
  );

  // Reabrir sempre comeca do zero, igual ao openBookingSheet() do prototipo
  // vanilla — derivado direto no render (sem efeito) comparando com o open
  // do render anterior, o mesmo padrao usado no useDelayedUnmount do
  // BottomSheet.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open && service) {
      dispatch({ type: "RESET", service, name: prefillName, phone: prefillPhone, today });
    }
  }

  const barber = state.barberIdx !== null ? BARBERS[state.barberIdx] : null;

  function handleCtaClick() {
    if (state.step === 0) {
      dispatch({ type: "GO_TO_STEP", step: 1 });
      return;
    }
    if (state.step === 1) {
      dispatch({ type: "GO_TO_STEP", step: 2 });
      return;
    }
    if (state.step === 2) {
      const nameValid = state.name.trim().length > 0;
      const phoneValid = state.phone.trim().length > 0;
      if (!nameValid || !phoneValid) {
        dispatch({
          type: "SET_FIELD_ERRORS",
          nameError: nameValid ? null : "Informe seu nome completo",
          phoneError: phoneValid ? null : "Informe seu número de WhatsApp",
        });
        return;
      }
      dispatch({ type: "CONFIRM" });
      onBookingConfirmed?.();
      return;
    }
    onClose();
  }

  const ctaLabel = state.step === 3 ? "Fechar" : state.step === 2 ? "Confirmar agendamento" : "Continuar";
  const ctaDisabled = (state.step === 0 && state.barberIdx === null) || (state.step === 1 && !state.time);

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={state.service.name}
      subtitle={state.step === 3 ? "Confirmado" : `Passo ${state.step + 1} de 3`}
      progress={state.step === 3 ? 100 : ((state.step + 1) / 3) * 100}
      footer={
        <button className="btn btn-primary" type="button" disabled={ctaDisabled} onClick={handleCtaClick}>
          {ctaLabel}
        </button>
      }
    >
      {state.step === 0 && (
        <BookingStepBarber
          service={state.service}
          barbers={BARBERS}
          selectedIdx={state.barberIdx}
          onSelect={(idx) => dispatch({ type: "SELECT_BARBER", barberIdx: idx })}
        />
      )}

      {state.step === 1 && (
        <>
          <button className="back-inline" type="button" onClick={() => dispatch({ type: "GO_TO_STEP", step: 0 })}>
            ‹ Trocar profissional
          </button>
          <BookingStepDateTime
            year={state.calYear}
            month={state.calMonth}
            selectedDate={state.date}
            selectedTime={state.time}
            today={today}
            barberIdx={state.barberIdx ?? 0}
            onSelectDate={(date) => dispatch({ type: "SELECT_DATE", date })}
            onSelectTime={(time) => dispatch({ type: "SELECT_TIME", time })}
            onPrevMonth={() => dispatch({ type: "NAV_MONTH", direction: -1 })}
            onNextMonth={() => dispatch({ type: "NAV_MONTH", direction: 1 })}
          />
        </>
      )}

      {state.step === 2 && barber && state.date && state.time && (
        <>
          <button className="back-inline" type="button" onClick={() => dispatch({ type: "GO_TO_STEP", step: 1 })}>
            ‹ Trocar data e horário
          </button>
          <BookingStepDetails
            service={state.service}
            barber={barber}
            date={state.date}
            time={state.time}
            name={state.name}
            phone={state.phone}
            nameError={state.nameError}
            phoneError={state.phoneError}
            onChangeName={(name) => dispatch({ type: "SET_NAME", name })}
            onChangePhone={(phone) => dispatch({ type: "SET_PHONE", phone })}
          />
        </>
      )}

      {state.step === 3 && barber && state.date && state.time && (
        <BookingStepSuccess
          service={state.service}
          barber={barber}
          date={state.date}
          time={state.time}
          whatsappLink={buildWhatsappLink({
            service: state.service,
            barber,
            date: state.date,
            time: state.time,
            name: state.name,
            phone: state.phone,
          })}
        />
      )}
    </BottomSheet>
  );
}
