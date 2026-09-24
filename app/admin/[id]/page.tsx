import { notFound } from "next/navigation";
import { requireCoach } from "@/lib/supabase/guards";
import { WEEKDAYS } from "@/lib/weekdays";
import { addExercise, deleteExercise } from "./actions";

export default async function ClientCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireCoach();

  const { data: client } = await supabase
    .from("clients")
    .select("id, name, email, phone, level, goal")
    .eq("id", id)
    .single();

  if (!client) {
    notFound();
  }

  let { data: program } = await supabase
    .from("programs")
    .select("id")
    .eq("client_id", id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!program) {
    const { data: created } = await supabase
      .from("programs")
      .insert({ client_id: id, is_active: true })
      .select("id")
      .single();
    program = created;
  }

  const { data: exercises } = await supabase
    .from("exercises")
    .select("id, day_label, name, sets, reps, coach_comment, order_index")
    .eq("program_id", program!.id)
    .order("order_index", { ascending: true });

  const { data: recentLogs } = await supabase
    .from("workout_logs")
    .select("date, status, comment, exercises(name)")
    .eq("client_id", id)
    .order("date", { ascending: false })
    .limit(10);

  const byDay = new Map<string, typeof exercises>();
  (exercises || []).forEach((e) => {
    if (!byDay.has(e.day_label)) byDay.set(e.day_label, []);
    byDay.get(e.day_label)!.push(e);
  });

  return (
    <main>
      <section className="authSection">
        <div className="cabinetContainer" style={{ maxWidth: 880 }}>
          <a href="/admin" className="backLink">← Усі клієнти</a>

          <div className="authCard">
            <h1 className="sectionTitle">{client.name || client.email}</h1>
            <p className="authNote">
              {client.email} {client.phone ? `· ${client.phone}` : ""}
              {client.level ? ` · ${client.level}` : ""}
            </p>
            {client.goal && <p className="authNote">Ціль: {client.goal}</p>}
          </div>

          <div className="authCard">
            <h2 className="cabinetDayTitle">Програма тренувань</h2>

            {WEEKDAYS.map((day) => {
              const dayExercises = byDay.get(day) || [];
              if (dayExercises.length === 0) return null;
              return (
                <div key={day} className="weekDay" style={{ marginBottom: 14 }}>
                  <p className="weekDayTitle">{day}</p>
                  {dayExercises.map((ex) => (
                    <div key={ex.id} className="adminRow">
                      <span>{ex.name}</span>
                      <span className="authNote">
                        {ex.sets ? `${ex.sets} × ${ex.reps ?? "?"}` : ex.reps}
                      </span>
                      <form action={deleteExercise}>
                        <input type="hidden" name="clientId" value={id} />
                        <input type="hidden" name="exerciseId" value={ex.id} />
                        <button type="submit" className="adminDeleteBtn">
                          Видалити
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              );
            })}

            <h3 className="cabinetDayTitle" style={{ fontSize: 16, marginTop: 20 }}>
              Додати вправу
            </h3>
            <form action={addExercise} className="authForm">
              <input type="hidden" name="clientId" value={id} />
              <input type="hidden" name="programId" value={program!.id} />
              <div className="adminRow">
                <select name="dayLabel" className="adminRowInput" required defaultValue="">
                  <option value="" disabled>
                    День
                  </option>
                  {WEEKDAYS.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <input name="name" className="adminRowInput" placeholder="Назва вправи" required />
                <input name="sets" className="adminRowInput" placeholder="Підходи" type="number" min={1} />
                <input name="reps" className="adminRowInput" placeholder="Повторення" />
              </div>
              <input name="coachComment" className="authInput" placeholder="Коментар тренера (необов'язково)" />
              <button type="submit" className="authButton" style={{ justifySelf: "start" }}>
                Додати
              </button>
            </form>
          </div>

          <div className="authCard">
            <h2 className="cabinetDayTitle">Останні записи журналу</h2>
            {(!recentLogs || recentLogs.length === 0) && (
              <p className="authNote">Клієнт ще не відмічав виконання вправ.</p>
            )}
            {recentLogs && recentLogs.length > 0 && (
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Вправа</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLogs.map((log, i) => (
                    <tr key={i}>
                      <td>{log.date}</td>
                      <td>{(log.exercises as unknown as { name: string } | null)?.name ?? "—"}</td>
                      <td>{log.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
