"use client";

import { useState } from "react";
import { StarRating } from "./StarRating";
import { ReviewCard } from "./ReviewCard";
import { ReviewSheet } from "./ReviewSheet";
import { REVIEWS } from "@/data/reviews";
import type { Review } from "@/types/review";

type ReviewWithId = Review & { id: string };

const INITIAL_REVIEWS: ReviewWithId[] = REVIEWS.map((r, i) => ({ ...r, id: `seed-${i}` }));

type AvaliacoesPanelProps = {
  active: boolean;
};

export function AvaliacoesPanel({ active }: AvaliacoesPanelProps) {
  const [reviews, setReviews] = useState<ReviewWithId[]>(INITIAL_REVIEWS);
  const [sheetOpen, setSheetOpen] = useState(false);

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  function handleSubmit({ rating, name, text }: { rating: number; name: string; text: string }) {
    const newReview: ReviewWithId = {
      id: `review-${Date.now()}`,
      name,
      rating,
      meta: "agora mesmo",
      text,
      photos: [],
    };
    setReviews((prev) => [newReview, ...prev]);
    setSheetOpen(false);
  }

  return (
    <div className={`panel ${active ? "active" : ""}`} id="panel-avaliacoes" role="tabpanel" aria-labelledby="tab-avaliacoes">
      <div className="reviews-summary">
        <div className="rating-big">{avg.toFixed(1)}</div>
        <div className="rating-side">
          <div className="rating-stars">
            <StarRating rating={Math.round(avg)} />
          </div>
          <div className="rating-count">{reviews.length} avaliações</div>
        </div>
      </div>
      <button className="btn btn-primary" type="button" style={{ marginBottom: 18 }} onClick={() => setSheetOpen(true)}>
        Deixar avaliação
      </button>
      <div>
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
      <ReviewSheet open={sheetOpen} onClose={() => setSheetOpen(false)} onSubmit={handleSubmit} />
    </div>
  );
}
