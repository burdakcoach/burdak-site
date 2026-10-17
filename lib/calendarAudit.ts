import { google } from "googleapis";

// Записи, які повторюються щодня/щотижня і не є тренуваннями —
// щоб не захаращувати список при кожній перевірці.
const ROUTINE_TITLES = new Set([
  "сніданок", "сніданок 2", "обід", "перекус", "вечеря", "перед сном",
  "силова", "trx", "тrx", "трх",
]);

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/^тренування:\s*/i, "")
    .replace(/[^\p{L}\s]/gu, "")
    .trim();
}

export type UnmatchedCalendarName = {
  title: string;
  count: number;
  firstDate: string;
  lastDate: string;
};

export async function findUnmatchedCalendarNames(
  clientNames: string[],
  timeMin: string,
  timeMax: string
): Promise<UnmatchedCalendarName[]> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) {
    throw new Error("Google service account credentials are not set");
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const res = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 2500,
  });

  const events = (res.data.items ?? []).filter(
    (e) => e.status !== "cancelled" && e.start?.dateTime && e.summary
  );

  const clientTokens = clientNames.map(normalize);

  const byTitle = new Map<string, UnmatchedCalendarName>();

  for (const e of events) {
    const raw = e.summary!;
    const norm = normalize(raw);
    if (!norm) continue;
    if (ROUTINE_TITLES.has(norm)) continue;

    const words = norm.split(/\s+/).filter((w) => w.length >= 3);
    const matchesClient = clientTokens.some((ct) => {
      const ctWords = ct.split(/\s+/).filter((w) => w.length >= 3);
      return words.some((w) => ctWords.includes(w));
    });
    if (matchesClient) continue;

    const date = e.start!.dateTime!.slice(0, 10);
    const displayTitle = raw.replace(/^тренування:\s*/i, "").trim();

    const existing = byTitle.get(norm);
    if (existing) {
      existing.count++;
      if (date < existing.firstDate) existing.firstDate = date;
      if (date > existing.lastDate) existing.lastDate = date;
    } else {
      byTitle.set(norm, { title: displayTitle, count: 1, firstDate: date, lastDate: date });
    }
  }

  return Array.from(byTitle.values()).sort((a, b) => b.count - a.count);
}
