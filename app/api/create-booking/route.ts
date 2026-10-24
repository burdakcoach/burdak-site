import { NextRequest, NextResponse } from "next/server";

import { getEvents } from "@/lib/googleCalendar";

const PRICE_UAH = 500;

export async function POST(req: NextRequest) {
  try {
    const { name, phone, start, end } = await req.json();

    if (!name || !phone || !start || !end) {
      return NextResponse.json({ error: "Заповни всі поля" }, { status: 400 });
    }

    const existingEvents = await getEvents(start, end);
    const overlappingCount = existingEvents.filter((e) => {
      const eventStart = new Date(e.start);
      const eventEnd = new Date(e.end);
      const slotStart = new Date(start);
      const slotEnd = new Date(end);
      return slotStart < eventEnd && slotEnd > eventStart;
    }).length;

    if (overlappingCount >= 2) {
      return NextResponse.json(
        { error: "На жаль, цей час вже повністю заброньовано. Обери інший слот." },
        { status: 409 }
      );
    }

    const token = process.env.MONOBANK_TOKEN;
    if (!token) {
      throw new Error("Monobank token is not set");
    }

    const baseUrl = `https://${req.headers.get("host")}`;
    const reference = Buffer.from(
      JSON.stringify({ name, phone, start, end })
    ).toString("base64");

    const invoiceRes = await fetch(
      "https://api.monobank.ua/api/merchant/invoice/create",
      {
        method: "POST",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: PRICE_UAH * 100,
          ccy: 980,
          merchantPaymInfo: {
            reference,
            destination: "Оплата персонального тренування",
            basketOrder: [
              {
                name: "Персональне тренування",
                qty: 1,
                sum: PRICE_UAH * 100,
              },
            ],
          },
          redirectUrl: `${baseUrl}/booking?success=1&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&name=${encodeURIComponent(name)}`,
          webHookUrl: `${baseUrl}/api/monobank-webhook`,
          validity: 3600,
          paymentType: "debit",
        }),
      }
    );

    const invoiceData = await invoiceRes.json();

    if (!invoiceRes.ok) {
      console.error("Monobank invoice error:", invoiceData);
      throw new Error(invoiceData.errText || "Не вдалося створити рахунок");
    }

    return NextResponse.json({ paymentUrl: invoiceData.pageUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Не вдалося оформити запис" },
      { status: 500 }
    );
  }
}