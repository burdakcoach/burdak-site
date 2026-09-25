"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function uploadPhoto(formData: FormData) {
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

  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return;
  }

  const angle = String(formData.get("angle") || "") || null;
  const note = String(formData.get("note") || "") || null;

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${client.id}/${Date.now()}-${angle || "photo"}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("photos").upload(path, file, {
    contentType: file.type || "image/jpeg",
  });

  if (uploadError) {
    console.error("Photo upload failed:", uploadError.message);
    return;
  }

  await supabase.from("photos").insert({
    client_id: client.id,
    angle,
    note,
    storage_path: path,
  });

  revalidatePath("/dashboard/progress");
}

export async function deletePhoto(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const photoId = String(formData.get("photoId") || "");
  const storagePath = String(formData.get("storagePath") || "");
  if (!photoId) {
    return;
  }

  await supabase.from("photos").delete().eq("id", photoId);
  if (storagePath) {
    await supabase.storage.from("photos").remove([storagePath]);
  }

  revalidatePath("/dashboard/progress");
}
