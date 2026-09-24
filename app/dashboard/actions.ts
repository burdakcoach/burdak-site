"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { kyivToday } from "@/lib/weekdays";

const STATUSES = ["Виконано", "Пропуск", "Частково"] as const;
export type WorkoutStatus = (typeof STATUSES)[number];

export async function logWorkoutStatus(exerciseId: string, status: WorkoutStatus) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!exerciseId || !STATUSES.includes(status)) {
    return;
  }

  const { data: exercise } = await supabase
    .from("exercises")
    .select("sets, reps")
    .eq("id", exerciseId)
    .single();

  if (!exercise) {
    return;
  }

  await supabase.from("workout_logs").upsert(
    {
      client_id: user.id,
      exercise_id: exerciseId,
      date: kyivToday(),
      planned_sets: exercise.sets,
      planned_reps: exercise.reps,
      status,
    },
    { onConflict: "client_id,exercise_id,date" }
  );

  revalidatePath("/dashboard");
}
