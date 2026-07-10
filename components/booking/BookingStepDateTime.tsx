"use client";

import { Calendar } from "./Calendar";

type BookingStepDateTimeProps = {
  year: number;
  month: number;
  selectedDate: Date | null;
  selectedTime: string | null;
  today: Date;
  barberIdx: number;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export function BookingStepDateTime(props: BookingStepDateTimeProps) {
  return (
    <>
      <div className="step-heading">
        <h2>Data e horário</h2>
        <p>Horários riscados já estão ocupados.</p>
      </div>
      <Calendar
        year={props.year}
        month={props.month}
        selectedDate={props.selectedDate}
        selectedTime={props.selectedTime}
        today={props.today}
        barberIdx={props.barberIdx}
        onSelectDay={props.onSelectDate}
        onSelectTime={props.onSelectTime}
        onPrevMonth={props.onPrevMonth}
        onNextMonth={props.onNextMonth}
      />
    </>
  );
}
