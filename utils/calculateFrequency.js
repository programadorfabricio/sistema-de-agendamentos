export function calculateFrequency(history){
  if(history.length <= 1) return null;
  let totalGap = 0;
  for(let i = 0; i < history.length - 1; i++){
    totalGap += Math.round((history[i].date - history[i + 1].date) / 86400000);
  }
  return Math.round(totalGap / (history.length - 1));
}
