export function calculateFavoriteBarber(history){
  const barberCounts = {};
  history.forEach(h => { barberCounts[h.barber] = (barberCounts[h.barber] || 0) + 1; });
  return Object.entries(barberCounts).sort((a, b) => b[1] - a[1])[0][0];
}
