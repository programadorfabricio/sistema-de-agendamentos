export function formatDurationLabel(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return hours > 0 ? `${hours}h${mins > 0 ? mins + "min" : ""}` : `${mins}min`;
}
