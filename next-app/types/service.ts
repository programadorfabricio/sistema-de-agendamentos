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
