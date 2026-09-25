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

  const { data: measurements } = await supabase
    .from("measurements")
    .select("id, date, weight, waist, wellbeing")
    .eq("client_id", id)
    .order("date", { ascending: false });

  const { data: photos } = await supabase
    .from("photos")
    .select("id, date, angle, note, storage_path")
    .eq("client_id", id)
    .order("date", { ascending: false });

  const photoUrls = new Map<string, string>();
  if (photos && photos.length > 0) {
    const { data: signed } = await supabase.storage
      .from("photos")
      .createSignedUrls(
        photos.map((p) => p.storage_path),
        3600
      );
    (signed || []).forEach((s) => {
      if (s.signedUrl) photoUrls.set(s.path ?? "", s.signedUrl);
    });
  }

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

            {Array.from(byDay.keys()).map((day) => {
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
                <input
                  name="dayLabel"
                  className="adminRowInput"
                  placeholder="День (напр. День A)"
                  list="dayLabelOptions"
                  required
                />
                <datalist id="dayLabelOptions">
                  {Array.from(new Set([...byDay.keys(), ...WEEKDAYS])).map((day) => (
                    <option key={day} value={day} />
                  ))}
                </datalist>
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

          <div className="authCard">
            <h2 className="cabinetDayTitle">Заміри</h2>
            {(!measurements || measurements.length === 0) && (
              <p className="authNote">Замірів ще немає.</p>
            )}
            {measurements && measurements.length > 0 && (
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Вага</th>
                    <th>Талія</th>
                    <th>Самопочуття</th>
                  </tr>
                </thead>
                <tbody>
                  {measurements.map((m) => (
                    <tr key={m.id}>
                      <td>{m.date}</td>
                      <td>{m.weight ?? "—"}</td>
                      <td>{m.waist ?? "—"}</td>
                      <td>{m.wellbeing ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="authCard">
            <h2 className="cabinetDayTitle">Фото прогресу</h2>
            {(!photos || photos.length === 0) && (
              <p className="authNote">Фото ще немає.</p>
            )}
            {photos && photos.length > 0 && (
              <div className="photoGrid">
                {photos.map((p) => {
                  const url = photoUrls.get(p.storage_path);
                  return (
                    <div key={p.id} className="photoCard">
                      {url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={url} alt={p.angle || "Фото прогресу"} className="photoImage" />
                      )}
                      <p className="authNote">
                        {p.date} {p.angle ? `· ${p.angle}` : ""}
                      </p>
                      {p.note && <p className="authNote">{p.note}</p>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
