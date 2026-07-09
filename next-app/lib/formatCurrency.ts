export function money(n: number | null): string {
  return n === null ? 'Consultar' : 'R$ ' + n.toFixed(0);
}
