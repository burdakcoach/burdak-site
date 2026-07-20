import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent } from "@/lib/googleCalendar";

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const invoiceId = body.invoiceId;

    if (!invoiceId) {
      return NextResponse.json({ ok: true });
    }

    const token = process.env.MONOBANK_TOKEN;
    const statusRes = await fetch(
      `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`,
      { headers: { "X-Token": token! } }
    );
    const statusData = await statusRes.json();

    if (statusData.status !== "success") {
      return NextResponse.json({ ok: true });
    }

    const reference = statusData.reference || statusData.merchantPaymInfo?.reference;
    if (!reference) {
      console.error("No reference found in invoice status", statusData);
      return NextResponse.json({ ok: true });
    }

    const { name, phone, start, end } = JSON.parse(
      Buffer.from(reference, "base64").toString("utf-8")
    );

    await createCalendarEvent({
      summary: `Тренування: ${name}`,
      description: `Клієнт: ${name}\nТелефон: ${phone}\nОплачено через сайт`,
      start,
      end,
    });

    await sendTelegramMessage(
      `✅ Нове бронювання!\n\n👤 ${name}\n📞 ${phone}\n🕐 ${new Date(start).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" })}\n\nОплату отримано.`
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}