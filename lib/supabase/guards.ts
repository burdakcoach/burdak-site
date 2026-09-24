import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireCoach() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("role")
    .eq("auth_user_id", user.id)
    .single();

  if (client?.role !== "coach") {
    redirect("/dashboard");
  }

  return { supabase, user };
}
