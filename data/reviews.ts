import type { Review } from "@/types/review";

const BLUR_CORTE1 =
  'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAgEFAAAAAAAAAAAAAAABAwACERITITGB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AITWL2arrQIyc8E6ScdjyIiBf//Z';
const BLUR_CORTE2 =
  'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAgEFAAAAAAAAAAAAAAAAAgEDMRESEyFh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABcRAAMBAAAAAAAAAAAAAAAAAAABEQL/2gAMAwEAAhEDEQA/AIbtVxstW9YxM5169AAeoxKj/9k=';
const BLUR_CORTE3 =
  'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAL/xAAcEAACAgIDAAAAAAAAAAAAAAAAAQIDBAUxQXH/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABgRAQEAAwAAAAAAAAAAAAAAAAEAAhEx/9oADAMBAAIRAxEAPwCcTbYsGo21Raa5Uu/AATMl7Ogv/9k=';
const BLUR_CORTE4 =
  'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAbEAACAwADAAAAAAAAAAAAAAABBAADEQIF0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAD/8QAGBEAAgMAAAAAAAAAAAAAAAAAAAECElH/2gAMAwEAAhEDEQA/AJM9cmwsLFOQqsI3AdHsREWZNS0//9k=';

// Avaliações mock — em produção viriam do backend, junto com fotos reais dos clientes
export const REVIEWS: Review[] = [
  {
    name: 'Marcelo A.',
    rating: 5,
    meta: 'Corte + Barba · há 3 dias',
    text: 'Melhor barbearia de Paulínia sem dúvida. O Renato mandou muito bem no degradê.',
    photos: [{ src: 'https://picsum.photos/seed/corte1/200/200', blurDataURL: BLUR_CORTE1 }],
  },
  { name: 'Bruno T.', rating: 5, meta: 'Barba · há 1 semana', text: 'Ambiente top e o Diego é fera na navalha. Voltarei sempre.', photos: [] },
  {
    name: 'Felipe R.',
    rating: 4,
    meta: 'Corte · há 2 semanas',
    text: 'Muito bom, só demorou um pouco além do horário marcado.',
    photos: [
      { src: 'https://picsum.photos/seed/corte2/200/200', blurDataURL: BLUR_CORTE2 },
      { src: 'https://picsum.photos/seed/corte3/200/200', blurDataURL: BLUR_CORTE3 },
    ],
  },
  { name: 'Gustavo M.', rating: 5, meta: 'Corte + Barba · há 3 semanas', text: 'Atendimento excelente do início ao fim, recomendo demais.', photos: [] },
  {
    name: 'Thiago L.',
    rating: 5,
    meta: 'Design de cavanhaque · há 1 mês',
    text: 'O Kaique é muito detalhista, ficou perfeito.',
    photos: [{ src: 'https://picsum.photos/seed/corte4/200/200', blurDataURL: BLUR_CORTE4 }],
  },
];
