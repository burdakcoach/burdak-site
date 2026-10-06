import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { kyivToday, kyivTodayWeekday } from "@/lib/weekdays";
import { logWorkoutStatus, type WorkoutStatus } from "./actions";

const STATUS_OPTIONS: WorkoutStatus[] = ["Виконано", "Частково", "Пропуск"];

type Exercise = {
  id: string;
  day_label: string;
  block: string | null;
  name: string;
  sets: number | null;
  reps: string | null;
  coach_comment: string | null;
  order_index: number;
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ day?: string }>;
}) {
  const { day: requestedDay } = await searchParams;
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

  const { data: program } = client
    ? await supabase
        .from("programs")
        .select("id")
        .eq("client_id", client.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  const { data: exercises } = program
    ? await supabase
        .from("exercises")
        .select("id, day_label, block, name, sets, reps, coach_comment, order_index")
        .eq("program_id", program.id)
        .order("order_index", { ascending: true })
    : { data: [] as Exercise[] };

  const today = kyivToday();
  const todayWeekday = kyivTodayWeekday();

  const dayLabels: string[] = [];
  (exercises || []).forEach((e) => {
    if (!dayLabels.includes(e.day_label)) dayLabels.push(e.day_label);
  });

  const selectedDay =
    (requestedDay && dayLabels.includes(requestedDay) && requestedDay) ||
    (dayLabels.includes(todayWeekday) && todayWeekday) ||
    dayLabels[0] ||
    todayWeekday;

  const todayExercises = (exercises || []).filter((e) => e.day_label === selectedDay);

  const exerciseIds = (exercises || []).map((e) => e.id);
  const { data: todayLogs } =
    client && exerciseIds.length > 0
      ? await supabase
          .from("workout_logs")
          .select("exercise_id, status")
          .eq("client_id", client.id)
          .eq("date", today)
          .in("exercise_id", exerciseIds)
      : { data: [] };

  const statusByExercise = new Map((todayLogs || []).map((l) => [l.exercise_id, l.status]));

  return (
    <>
      <div className="authCard">
        <h2 className="cabinetDayTitle">Моя програма</h2>

        {!program && <p className="authNote">Тренер ще не призначив тобі програму.</p>}

        {program && dayLabels.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {dayLabels.map((day) => (
              <a
                key={day}
                href={`/dashboard?day=${encodeURIComponent(day)}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  padding: "6px 12px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: day === selectedDay ? 700 : 400,
                  border:
                    day === selectedDay ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {day}
                {day === todayWeekday ? " · сьогодні" : ""}
              </a>
            ))}
          </div>
        )}

        {program && todayExercises.length === 0 && (
          <p className="authNote">На цей день вправ немає — день відпочинку.</p>
        )}

        {todayExercises.map((ex) => (
          <div key={ex.id} className="exerciseCard">
            <div className="exerciseHeader">
              <span className="exerciseName">{ex.name}</span>
              <span className="exerciseMeta">
                {ex.sets ? `${ex.sets} × ${ex.reps ?? "?"}` : ex.reps}
              </span>
            </div>
            {ex.coach_comment && <p className="exerciseComment">{ex.coach_comment}</p>}
            <div className="statusButtons">
              {STATUS_OPTIONS.map((status) => {
                const isCurrent = statusByExercise.get(ex.id) === status;
                return (
                  <form key={status} action={logWorkoutStatus.bind(null, ex.id, status)}>
                    <button type="submit" className={isCurrent ? "statusBtnActive" : "statusBtn"}>
                      {status}
                    </button>
                  </form>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
