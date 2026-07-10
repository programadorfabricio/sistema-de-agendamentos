"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useAuth } from "@/contexts/AuthContext";

type ReviewSubmission = {
  rating: number;
  name: string;
  text: string;
};

type ReviewSheetProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: ReviewSubmission) => void;
};

export function ReviewSheet({ open, onClose, onSubmit }: ReviewSheetProps) {
  const auth = useAuth();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [ratingError, setRatingError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [textError, setTextError] = useState<string | null>(null);

  // Reabrir sempre comeca do zero (pre-preenchendo o nome se logado), mesmo
  // padrao "adjusting state during render" do Booking/Login/StaffSheet.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setRating(0);
      setName(auth.user.loggedIn ? auth.user.name : "");
      setText("");
      setRatingError(null);
      setNameError(null);
      setTextError(null);
    }
  }

  function handleSubmit() {
    let valid = true;
    if (!rating) {
      setRatingError("Selecione uma nota de 1 a 5 estrelas");
      valid = false;
    } else {
      setRatingError(null);
    }
    if (!name.trim()) {
      setNameError("Informe seu nome");
      valid = false;
    } else {
      setNameError(null);
    }
    if (!text.trim()) {
      setTextError("Escreva um breve comentário");
      valid = false;
    } else {
      setTextError(null);
    }
    if (!valid) return;
    onSubmit({ rating, name: name.trim(), text: text.trim() });
  }

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Deixar avaliação"
      subtitle="Conte como foi sua experiência"
      footer={
        <button className="btn btn-primary" type="button" onClick={handleSubmit}>
          Enviar avaliação
        </button>
      }
    >
      <div
        className="star-picker"
        role="radiogroup"
        aria-label="Sua nota, de 1 a 5 estrelas"
        aria-invalid={ratingError ? true : undefined}
        aria-describedby={ratingError ? "ratingError" : undefined}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={i <= rating}
            aria-label={`${i} estrela${i > 1 ? "s" : ""}`}
            className={i <= rating ? "active" : undefined}
            onClick={() => {
              setRating(i);
              setRatingError(null);
            }}
          >
            ★
          </button>
        ))}
      </div>
      {ratingError ? (
        <p id="ratingError" className="field-error" role="alert" style={{ justifyContent: "center" }}>
          ⚠ {ratingError}
        </p>
      ) : null}

      <div className="field">
        <label htmlFor="reviewNameInput">Seu nome</label>
        <input
          id="reviewNameInput"
          type="text"
          placeholder="Seu nome"
          value={name}
          className={nameError ? "error" : undefined}
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "reviewNameInput-error" : undefined}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(null);
          }}
        />
        {nameError ? (
          <p id="reviewNameInput-error" className="field-error" role="alert">
            ⚠ {nameError}
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor="reviewTextInput">Comentário</label>
        <textarea
          id="reviewTextInput"
          className={`review-textarea ${textError ? "error" : ""}`}
          placeholder="Conte como foi o atendimento..."
          value={text}
          aria-invalid={textError ? true : undefined}
          aria-describedby={textError ? "reviewTextInput-error" : undefined}
          onChange={(e) => {
            setText(e.target.value);
            setTextError(null);
          }}
        />
        {textError ? (
          <p id="reviewTextInput-error" className="field-error" role="alert">
            ⚠ {textError}
          </p>
        ) : null}
      </div>
    </BottomSheet>
  );
}
