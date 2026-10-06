// WM Date format (English): "May 1, 2016" — no leading zero on the day.
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC", // the ISO date has no time, so keep it in UTC to avoid shifting a day
});

export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return DATE_FORMATTER.format(date);
}
