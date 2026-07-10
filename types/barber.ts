export type Barber = {
  id: string;
  name: string;
  role: string;
  photo: string;
  /** Base64 gerado estaticamente a partir de `photo` (ver scripts de geracao no PR) — URL conhecida em build time. */
  photoBlurDataURL: string;
};
