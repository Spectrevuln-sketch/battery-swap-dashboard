export function formatDateTime(value: Date | null): string {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

export function formatHour(value: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}
