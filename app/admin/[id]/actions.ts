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

const PROFILE_TEXT_FIELDS = [
  "name",
  "email",
  "phone",
  "level",
  "goal",
  "city",
  "job_type",
  "health_notes",
  "start_weight",
  "training_frequency",
  "activity_level",
  "priorities",
] as const;

export async function updateClientProfile(formData: FormData) {
  const { supabase } = await requireCoach();
  const clientId = String(formData.get("clientId") || "");
  if (!clientId) {
    return;
  }

  const payload: Record<string, string | number | null> = {};

  for (const key of PROFILE_TEXT_FIELDS) {
    const raw = formData.get(key);
    payload[key] = raw != null && String(raw).trim() !== "" ? String(raw).trim() : null;
  }

  const age = formData.get("age");
  payload.age = age && String(age).trim() !== "" ? Number(age) : null;

  const heightCm = formData.get("height_cm");
  payload.height_cm = heightCm && String(heightCm).trim() !== "" ? Number(heightCm) : null;

  const startDate = formData.get("start_date");
  payload.start_date = startDate && String(startDate).trim() !== "" ? String(startDate) : null;

  await supabase.from("clients").update(payload).eq("id", clientId);
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

export async function uploadClientPhoto(formData: FormData) {
  const { supabase } = await requireCoach();
  const clientId = String(formData.get("clientId") || "");
  if (!clientId) {
    return;
  }

  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return;
  }

  const angle = String(formData.get("angle") || "") || null;
  const note = String(formData.get("note") || "") || null;
  const date = String(formData.get("date") || "") || undefined;

  const ext = (file.name.split(".").pop() || "jpg").replace(/[^a-zA-Z0-9]/g, "") || "jpg";
  const path = `${clientId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("photos").upload(path, file, {
    contentType: file.type || "image/jpeg",
  });

  if (uploadError) {
    console.error("Photo upload failed:", uploadError.message);
    return;
  }

  await supabase.from("photos").insert({
    client_id: clientId,
    angle,
    note,
    date,
    storage_path: path,
  });

  revalidatePath(`/admin/${clientId}`);
}

export async function deleteClientPhoto(formData: FormData) {
  const { supabase } = await requireCoach();
  const clientId = String(formData.get("clientId") || "");
  const photoId = String(formData.get("photoId") || "");
  const storagePath = String(formData.get("storagePath") || "");

  if (!photoId) {
    return;
  }

  await supabase.from("photos").delete().eq("id", photoId);
  if (storagePath) {
    await supabase.storage.from("photos").remove([storagePath]);
  }

  revalidatePath(`/admin/${clientId}`);
}
