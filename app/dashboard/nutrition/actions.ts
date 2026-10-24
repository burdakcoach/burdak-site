"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
