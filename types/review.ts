export type ReviewPhoto = {
  src: string;
  /** Base64 gerado estaticamente (URL conhecida em build time) — so existe pras fotos mock. */
  blurDataURL: string;
};

export type Review = {
  name: string;
  rating: number;
  meta: string;
  text: string;
  photos: ReviewPhoto[];
};
