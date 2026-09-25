"use server";

import { redirect } from "next/navigation";
import { requireCoach } from "@/lib/supabase/guards";

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
