import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { kyivToday, kyivTodayWeekday, WEEKDAYS } from "@/lib/weekdays";
import { logWorkoutStatus, type WorkoutStatus } from "./actions";
import SignOutButton from "./SignOutButton";

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

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id, name, level, role")
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
  const todayExercises = (exercises || []).filter((e) => e.day_label === todayWeekday);

  const exerciseIds = (exercises || []).map((e) => e.id);
  const { data: todayLogs } =
    exerciseIds.length > 0
      ? await supabase
          .from("workout_logs")
          .select("exercise_id, status")
          .eq("client_id", client!.id)
          .eq("date", today)
          .in("exercise_id", exerciseIds)
      : { data: [] };

  const statusByExercise = new Map((todayLogs || []).map((l) => [l.exercise_id, l.status]));

  const byDay = new Map<string, Exercise[]>();
  (exercises || []).forEach((e) => {
    if (!byDay.has(e.day_label)) byDay.set(e.day_label, []);
    byDay.get(e.day_label)!.push(e);
  });

  return (
    <main>
      <section className="authSection">
        <div className="cabinetContainer">
          <div className="cabinetHeader">
            <div>
              <h1 className="sectionTitle">
                {client?.name ? `Привіт, ${client.name}` : "Кабінет"}
              </h1>
              <p className="authNote">
                {client?.level ? `Рівень: ${client.level}` : "Профіль ще не заповнено тренером."}
              </p>
            </div>
            <SignOutButton />
          </div>

          <div className="authCard">
            <h2 className="cabinetDayTitle">Сьогодні · {todayWeekday}</h2>

            {!program && (
              <p className="authNote">Тренер ще не призначив тобі програму.</p>
            )}

            {program && todayExercises.length === 0 && (
              <p className="authNote">На сьогодні вправ немає — день відпочинку.</p>
            )}

            {todayExercises.map((ex) => (
              <div key={ex.id} className="exerciseCard">
                <div className="exerciseHeader">
                  <span className="exerciseName">{ex.name}</span>
                  <span className="exerciseMeta">
                    {ex.sets ? `${ex.sets} × ${ex.reps ?? "?"}` : ex.reps}
                  </span>
                </div>
                {ex.coach_comment && (
                  <p className="exerciseComment">{ex.coach_comment}</p>
                )}
                <div className="statusButtons">
                  {STATUS_OPTIONS.map((status) => {
                    const isCurrent = statusByExercise.get(ex.id) === status;
                    return (
                      <form key={status} action={logWorkoutStatus.bind(null, ex.id, status)}>
                        <button
                          type="submit"
                          className={isCurrent ? "statusBtnActive" : "statusBtn"}
                        >
                          {status}
                        </button>
                      </form>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {program && (exercises || []).length > 0 && (
            <div className="authCard">
              <h2 className="cabinetDayTitle">Програма на тиждень</h2>
              <div className="weekOverview">
                {WEEKDAYS.filter((d) => d !== "Неділя" || byDay.has(d)).map((day) =>
                  byDay.has(day) ? (
                    <div key={day} className="weekDay">
                      <p className="weekDayTitle">{day}</p>
                      <ul className="weekDayList">
                        {byDay.get(day)!.map((e) => (
                          <li key={e.id}>{e.name}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
