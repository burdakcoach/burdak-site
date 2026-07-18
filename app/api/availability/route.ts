import { NextRequest, NextResponse } from "next/server";
import { getBusyTimes } from "@/lib/googleCalendar";

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 20; // останній старт слоту — 19:00 (h < 20)
const SLOT_MINUTES = 60;
const DAYS_AHEAD = 14;
const TIME_ZONE = "Europe/Kyiv";

function getTzOffsetMinutes(date: Date): number {
  const utcString = date.toLocaleString("en-US", { timeZone: "UTC" });
  const tzString = date.toLocaleString("en-US", { timeZone: TIME_ZONE });
  const utcDate = new Date(utcString);
  const tzDate = new Date(tzString);
  return (tzDate.getTime() - utcDate.getTime()) / 60000;
}

function kyivWallClockToUTC(year: number, month: number, day: number, hour: number): Date {
  const naiveUTC = new Date(Date.UTC(year, month, day, hour, 0, 0));
  const offsetMin = getTzOffsetMinutes(naiveUTC);
  return new Date(naiveUTC.getTime() - offsetMin * 60000);
}

export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(
      now.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000
    ).toISOString();

    const busy = await getBusyTimes(timeMin, timeMax);
    const slots: { start: string; end: string }[] = [];

    const todayKyiv = now.toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
    const [ky, km, kd] = todayKyiv.split("-").map(Number);

    for (let d = 0; d < DAYS_AHEAD; d++) {
      const dayDate = new Date(Date.UTC(ky, km - 1, kd + d));
      const weekday = dayDate.getUTCDay();
      if (weekday === 0) continue; // пропустити неділю

      const year = dayDate.getUTCFullYear();
      const month = dayDate.getUTCMonth();
      const day = dayDate.getUTCDate();

      for (let h = WORK_START_HOUR; h < WORK_END_HOUR; h++) {
        const slotStart = kyivWallClockToUTC(year, month, day, h);
        if (slotStart < now) continue;

        const slotEnd = new Date(slotStart.getTime() + SLOT_MINUTES * 60 * 1000);

        const overlaps = busy.some((b) => {
          const busyStart = new Date(b.start!);
          const busyEnd = new Date(b.end!);
          return slotStart < busyEnd && slotEnd > busyStart;
        });

        if (!overlaps) {
          slots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
          });
        }
      }
    }

    return NextResponse.json({ slots });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load availability" }, { status: 500 });
  }
}