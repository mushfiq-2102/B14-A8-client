// Events are stored as "YYYY-MM-DD" strings. All "today" checks use the
// Dhaka calendar date so the client and the API always agree.
const TIME_ZONE = "Asia/Dhaka";

export function todayISO() {
  return new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
}

export function tomorrowISO() {
  const [year, month, day] = todayISO().split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + 1));
  return next.toISOString().slice(0, 10);
}

export function formatEventDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
