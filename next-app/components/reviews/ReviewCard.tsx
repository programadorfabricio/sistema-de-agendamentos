import { StarRating } from "./StarRating";
import { initials } from "@/lib/text";
import type { Review } from "@/types/review";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="review-card">
      <div className="review-head">
        <div className="review-avatar">{initials(review.name)}</div>
        <div>
          <div className="review-name">{review.name}</div>
          <div className="review-meta">{review.meta}</div>
        </div>
        <div className="review-stars">
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="review-text">{review.text}</p>
      {review.photos.length ? (
        <div className="review-photos">
          {review.photos.map((p, i) => (
            <img src={p} alt="Foto do corte" key={i} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
