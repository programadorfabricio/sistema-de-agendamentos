export function calculateSpent(history){
  return history.reduce((sum, h) => sum + h.price, 0);
}
