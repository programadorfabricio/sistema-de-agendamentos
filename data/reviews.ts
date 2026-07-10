import type { Review } from "@/types/review";

// Fotos reais de barbearia (Unsplash), substituindo os placeholders do
// picsum.photos — as 2 fotos se alternam pelos 4 slots das avaliações mock,
// nunca repetindo a mesma foto duas vezes dentro da mesma avaliação.
const REAL_SCISSORS_CUT = 'https://images.unsplash.com/photo-1599011176306-4a96f1516d4d?w=800&q=80';
const BLUR_SCISSORS_CUT =
  'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMAAgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQF/8QAHRAAAgICAwEAAAAAAAAAAAAAAQIAAwQhERITYf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AIsZzVaVtyOtXB6KrabUTU8aglJ80PwjUQHsf//Z';

const REAL_BEARD_TRIM = 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=800&q=80';
const BLUR_BEARD_TRIM =
  'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMAAgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAHBAAAgMAAwEAAAAAAAAAAAAAAQIAAxEEEkFR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AM46slXZ2rLeBcOj7oiXONVXXXioowDyIH//2Q==';

// Avaliações mock — em produção viriam do backend, junto com fotos reais dos clientes
export const REVIEWS: Review[] = [
  {
    name: 'Marcelo A.',
    rating: 5,
    meta: 'Corte + Barba · há 3 dias',
    text: 'Melhor barbearia de Paulínia sem dúvida. O Renato mandou muito bem no degradê.',
    photos: [{ src: REAL_SCISSORS_CUT, blurDataURL: BLUR_SCISSORS_CUT }],
  },
  { name: 'Bruno T.', rating: 5, meta: 'Barba · há 1 semana', text: 'Ambiente top e o Diego é fera na navalha. Voltarei sempre.', photos: [] },
  {
    name: 'Felipe R.',
    rating: 4,
    meta: 'Corte · há 2 semanas',
    text: 'Muito bom, só demorou um pouco além do horário marcado.',
    photos: [
      { src: REAL_BEARD_TRIM, blurDataURL: BLUR_BEARD_TRIM },
      { src: REAL_SCISSORS_CUT, blurDataURL: BLUR_SCISSORS_CUT },
    ],
  },
  { name: 'Gustavo M.', rating: 5, meta: 'Corte + Barba · há 3 semanas', text: 'Atendimento excelente do início ao fim, recomendo demais.', photos: [] },
  {
    name: 'Thiago L.',
    rating: 5,
    meta: 'Design de cavanhaque · há 1 mês',
    text: 'O Kaique é muito detalhista, ficou perfeito.',
    photos: [{ src: REAL_BEARD_TRIM, blurDataURL: BLUR_BEARD_TRIM }],
  },
];
