"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCoach } from "@/lib/supabase/guards";
import { kyivToday } from "@/lib/weekdays";

const NUTRITION_STATUSES = ["Регулярно", "Нерегулярно", "Не звітує"] as const;

export async function logNutritionStatusFromList(formData: FormData) {
  const { supabase } = await requireCoach();
  const clientId = String(formData.get("clientId") || "");
  const status = String(formData.get("status") || "");

  if (!clientId || !NUTRITION_STATUSES.includes(status as (typeof NUTRITION_STATUSES)[number])) {
    return;
  }

  await supabase.from("nutrition_status_log").upsert(
    { client_id: clientId, date: kyivToday(), status },
    { onConflict: "client_id,date" }
  );

  revalidatePath("/admin");

  const returnQuery = String(formData.get("returnQuery") || "");
  redirect(`/admin${returnQuery ? `?${returnQuery}` : ""}`);
}

export async function createNewClient(formData: FormData) {
  const { supabase } = await requireCoach();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim() || null;
  const level = String(formData.get("level") || "").trim() || null;
  const goal = String(formData.get("goal") || "").trim() || null;

  if (!name) {
    return;
  }

  const { data: created } = await supabase
    .from("clients")
    .insert({ name, email, level, goal, role: "client" })
    .select("id")
    .single();

  if (created) {
    redirect(`/admin/${created.id}`);
  }
}
