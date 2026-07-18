import { NextRequest, NextResponse } from "next/server";
import { getBusyTimes } from "@/lib/googleCalendar";

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 20;
const SLOT_MINUTES = 60;
const DAYS_AHEAD = 14;

export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(
      now.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000
    ).toISOString();

    const busy = await getBusyTimes(timeMin, timeMax);
    const slots: { start: string; end: string }[] = [];

    for (let d = 0; d < DAYS_AHEAD; d++) {
      const day = new Date(now);
      day.setDate(day.getDate() + d);
      day.setHours(0, 0, 0, 0);

      if (day.getDay() === 0) continue; // пропустити неділю

      for (let h = WORK_START_HOUR; h < WORK_END_HOUR; h++) {
        const slotStart = new Date(day);
        slotStart.setHours(h, 0, 0, 0);
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
