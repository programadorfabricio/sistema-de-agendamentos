type StarRatingProps = {
  rating: number;
};

export function StarRating({ rating }: StarRatingProps) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? undefined : "empty"}>
          ★
        </span>
      ))}
    </>
  );
}
