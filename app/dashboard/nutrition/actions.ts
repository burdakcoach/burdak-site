"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { kyivToday } from "@/lib/weekdays";

export async function uploadNutritionScreenshot(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!client) {
    return;
  }

  const file = formData.get("screenshot");
  if (!(file instanceof File) || file.size === 0) {
    return;
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
    return;
  }

  await supabase.from("nutrition_screenshots").upsert(
    { client_id: client.id, date: today, storage_path: path },
    { onConflict: "client_id,date" }
  );

  revalidatePath("/dashboard/nutrition");
}

export async function deleteNutritionScreenshot(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const id = String(formData.get("id") || "");
  const storagePath = String(formData.get("storagePath") || "");
  if (!id) {
    return;
  }

  await supabase.from("nutrition_screenshots").delete().eq("id", id);
  if (storagePath) {
    await supabase.storage.from("nutrition-screenshots").remove([storagePath]);
  }

  revalidatePath("/dashboard/nutrition");
}
