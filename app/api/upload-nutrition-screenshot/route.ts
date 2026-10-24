import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { kyivToday } from "@/lib/weekdays";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Не авторизовано" }, { status: 401 });
    }

    const { data: client } = await supabase
      .from("clients")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (!client) {
      return NextResponse.json({ error: "Клієнта не знайдено" }, { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get("screenshot");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Файл не передано" }, { status: 400 });
    }

    const today = kyivToday();
    const ext = (file.name.split(".").pop() || "jpg").replace(/[^a-zA-Z0-9]/g, "") || "jpg";
    const path = `${client.id}/${today}.${ext}`;

    const { data: existing } = await supabase
      .from("nutrition_screenshots")
      .select("storage_path")
      .eq("client_id", client.id)
      .eq("date", today)
      .maybeSingle();

    if (existing && existing.storage_path !== path) {
      await supabase.storage.from("nutrition-screenshots").remove([existing.storage_path]);
    }

    const { error: uploadError } = await supabase.storage
      .from("nutrition-screenshots")
      .upload(path, file, { contentType: file.type || "image/jpeg", upsert: true });

    if (uploadError) {
      console.error("Nutrition screenshot upload failed:", uploadError.message);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { error: dbError } = await supabase.from("nutrition_screenshots").upsert(
      { client_id: client.id, date: today, storage_path: path },
      { onConflict: "client_id,date" }
    );

    if (dbError) {
      console.error("Nutrition screenshot DB upsert failed:", dbError.message);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Сталася помилка" }, { status: 500 });
  }
}
