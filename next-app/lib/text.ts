export function initials(name: string): string {
  return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

export function starsHtml(rating: number): string {
  let out = '';
  for (let i = 1; i <= 5; i++) out += `<span class="${i <= rating ? '' : 'empty'}">★</span>`;
  return out;
}
