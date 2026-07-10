import type { Category, Service } from "@/types/service";

export const CATEGORIES: Category[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'favoritos', label: '♥ Favoritos' },
  { id: 'padrao', label: 'Padrão' },
  { id: 'extra', label: 'Extra' },
  { id: 'domingo', label: 'Domingo' },
  { id: 'clube', label: 'Clube' },
  { id: 'outros', label: 'Outros' }
];

export const SERVICES: Service[] = [
  { id: 's1', cat: 'padrao', icon: '✂️', name: 'Corte', desc: 'Corte tradicional com tesoura e máquina', price: 50, duration: 30 },
  { id: 's2', cat: 'padrao', icon: '🪒', name: 'Barba', desc: 'Barba desenhada com toalha quente', price: 35, duration: 30 },
  { id: 's3', cat: 'padrao', icon: '💈', name: 'Corte + Barba', desc: 'Combo completo — corte e barba', price: 75, duration: 60 },
  { id: 's4', cat: 'extra', icon: '👁️', name: 'Sobrancelha', desc: 'Design e acabamento com navalha', price: 15, duration: 15 },
  { id: 's5', cat: 'extra', icon: '🎨', name: 'Pigmentação de barba', desc: 'Uniformiza falhas e realça o contorno', price: 40, duration: 20 },
  { id: 's6', cat: 'domingo', icon: '✂️', name: 'Corte Domingo', desc: 'Corte tradicional aos domingos', price: 60, duration: 30 },
  { id: 's7', cat: 'domingo', icon: '🪒', name: 'Barba Domingo', desc: 'Barba desenhada aos domingos', price: 45, duration: 30 },
  { id: 's8', cat: 'clube', icon: '✂️', name: 'Clube · Corte', desc: 'Serviço de corte para assinantes do Clube Navalha', price: null, duration: 30 },
  { id: 's9', cat: 'clube', icon: '🪒', name: 'Clube · Barba', desc: 'Serviço de barba para assinantes do Clube Navalha', price: null, duration: 30 },
  { id: 's10', cat: 'clube', icon: '💈', name: 'Clube · Combo', desc: 'Corte e barba para assinantes do Clube Navalha', price: null, duration: 60 },
  { id: 's11', cat: 'outros', icon: '🧒', name: 'Corte infantil', desc: 'Corte para crianças até 12 anos', price: 40, duration: 30 },
  { id: 's12', cat: 'outros', icon: '🧔', name: 'Design de cavanhaque', desc: 'Alinhamento e contorno com navalha', price: 25, duration: 20 }
];
