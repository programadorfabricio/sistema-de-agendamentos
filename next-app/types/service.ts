export type Category = {
  id: string;
  label: string;
};

export type Service = {
  id: string;
  cat: string;
  icon: string;
  name: string;
  desc: string;
  price: number | null;
  duration: number;
};

// O que o fluxo de agendamento realmente precisa — um Service serve aqui,
// mas tambem serve o combo de servicos selecionados (soma de duracao/preco),
// que nao tem cat/icon/desc proprios.
export type BookableService = {
  id: string;
  name: string;
  price: number | null;
  duration: number;
};
