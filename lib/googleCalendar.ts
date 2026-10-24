import { google } from "googleapis";

function getAuth(scopes: string[]) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error("Google service account credentials are not set");
  }

  return new google.auth.JWT({
    email,
    key,
    scopes,
  });
}

export async function getEvents(timeMin: string, timeMax: string) {
  const auth = getAuth(["https://www.googleapis.com/auth/calendar.readonly"]);
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const res = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime",
  });

  return (res.data.items ?? [])
    .filter((e) => e.status !== "cancelled" && e.start?.dateTime && e.end?.dateTime)
    .map((e) => ({
      start: e.start!.dateTime!,
      end: e.end!.dateTime!,
    }));
} 

export async function createCalendarEvent(params: {
  summary: string;
  description: string;
  start: string;
  end: string;
}) {
  const auth = getAuth(["https://www.googleapis.com/auth/calendar.events"]);
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: params.summary,
      description: params.description,
      start: { dateTime: params.start },
      end: { dateTime: params.end },
    },
  });

  return res.data;
}