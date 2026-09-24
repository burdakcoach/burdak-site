const TIME_ZONE = "Europe/Kyiv";

export const WEEKDAYS = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
] as const;

export function kyivToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
}

export function kyivTodayWeekday(): string {
  const [y, m, d] = kyivToday().split("-").map(Number);
  const index = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return WEEKDAYS[index];
}
