"use server";

import { revalidatePath } from "next/cache";
import { requireCoach } from "@/lib/supabase/guards";

export async function addExercise(formData: FormData) {
  const { supabase } = await requireCoach();

  const clientId = String(formData.get("clientId") || "");
  const programId = String(formData.get("programId") || "");
  const dayLabel = String(formData.get("dayLabel") || "");
  const name = String(formData.get("name") || "");
  const sets = formData.get("sets") ? Number(formData.get("sets")) : null;
  const reps = String(formData.get("reps") || "") || null;
  const coachComment = String(formData.get("coachComment") || "") || null;

  if (!programId || !dayLabel || !name) {
    return;
  }

  const { data: maxOrder } = await supabase
    .from("exercises")
    .select("order_index")
    .eq("program_id", programId)
    .order("order_index", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("exercises").insert({
    program_id: programId,
    day_label: dayLabel,
    name,
    sets,
    reps,
    coach_comment: coachComment,
    order_index: (maxOrder?.order_index ?? -1) + 1,
  });

  revalidatePath(`/admin/${clientId}`);
}

export async function deleteExercise(formData: FormData) {
  const { supabase } = await requireCoach();
  const clientId = String(formData.get("clientId") || "");
  const exerciseId = String(formData.get("exerciseId") || "");

  if (!exerciseId) {
    return;
  }

  await supabase.from("exercises").delete().eq("id", exerciseId);
  revalidatePath(`/admin/${clientId}`);
}
