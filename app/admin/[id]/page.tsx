import { notFound } from "next/navigation";
import { requireCoach } from "@/lib/supabase/guards";
import { WEEKDAYS } from "@/lib/weekdays";
import {
  activateProgram,
  addExercise,
  addMeasurement,
  deleteExercise,
  updateClientProfile,
  uploadClientPhoto,
  deleteClientPhoto,
} from "./actions";

export default async function ClientCardPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ program?: string }>;
}) {
  const { id } = await params;
  const { program: selectedProgramId } = await searchParams;
  const { supabase } = await requireCoach();

  const { data: client } = await supabase
    .from("clients")
    .select(
      "id, name, email, phone, level, goal, age, height_cm, start_weight, start_date, training_frequency, activity_level, priorities, health_notes, city, job_type, nutrition_reporting"
    )
    .eq("id", id)
    .single();

  if (!client) {
    notFound();
  }

  const { data: allPrograms } = await supabase
    .from("programs")
    .select("id, is_active, week_start_date, created_at")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  const programsList = allPrograms ?? [];

  let program =
    programsList.find((p) => p.id === selectedProgramId) ??
    programsList.find((p) => p.is_active) ??
    programsList[0];

  if (!program) {
    const { data: created } = await supabase
      .from("programs")
      .insert({ client_id: id, is_active: true })
      .select("id, is_active, week_start_date, created_at")
      .single();
    program = created!;
    programsList.push(program);
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
            <h1 className="sectionTitle">{client.name || client.email || "Клієнт"}</h1>

            <form action={updateClientProfile} className="authForm" style={{ marginTop: 18 }}>
              <input type="hidden" name="clientId" value={id} />
              <div className="adminRow">
                <input name="name" className="adminRowInput" placeholder="Ім'я" defaultValue={client.name ?? ""} />
                <input name="email" className="adminRowInput" placeholder="Email" type="email" defaultValue={client.email ?? ""} />
                <input name="phone" className="adminRowInput" placeholder="Телефон" defaultValue={client.phone ?? ""} />
                <input name="level" className="adminRowInput" placeholder="Рівень" defaultValue={client.level ?? ""} />
              </div>
              <div className="adminRow">
                <input name="goal" className="adminRowInput" placeholder="Ціль" defaultValue={client.goal ?? ""} />
                <input name="city" className="adminRowInput" placeholder="Місто" defaultValue={client.city ?? ""} />
                <input name="job_type" className="adminRowInput" placeholder="Статус/зайнятість" defaultValue={client.job_type ?? ""} />
                <input name="age" className="adminRowInput" placeholder="Вік" type="number" min={0} defaultValue={client.age ?? ""} />
              </div>
              <div className="adminRow">
                <input name="height_cm" className="adminRowInput" placeholder="Зріст, см" type="number" min={0} defaultValue={client.height_cm ?? ""} />
                <input name="start_weight" className="adminRowInput" placeholder="Вага на старті" defaultValue={client.start_weight ?? ""} />
                <input name="start_date" className="adminRowInput" placeholder="Дата старту" type="date" defaultValue={client.start_date ?? ""} />
                <input name="training_frequency" className="adminRowInput" placeholder="Тренувань/тиждень" defaultValue={client.training_frequency ?? ""} />
              </div>
              <input name="activity_level" className="authInput" placeholder="Активність" defaultValue={client.activity_level ?? ""} />
              <input name="priorities" className="authInput" placeholder="Пріоритети" defaultValue={client.priorities ?? ""} />
              <input name="health_notes" className="authInput" placeholder="Обмеження та застереження" defaultValue={client.health_notes ?? ""} />
              <select
                name="nutrition_reporting"
                className="authInput"
                defaultValue={client.nutrition_reporting ?? ""}
              >
                <option value="">Звітність по харчуванню — не вказано</option>
                <option value="Регулярно">Регулярно звітує</option>
                <option value="Нерегулярно">Нерегулярно звітує</option>
                <option value="Не звітує">Не звітує</option>
              </select>
              <button type="submit" className="authButton" style={{ justifySelf: "start" }}>
                Зберегти
              </button>
            </form>
          </div>

          {programsList.length > 1 && (
            <div className="authCard">
              <h2 className="cabinetDayTitle">Програми ({programsList.length})</h2>
              <p className="authNote" style={{ marginBottom: 12 }}>
                Клієнт бачить тільки активну. Інші — чернетки, видно тільки тут.
              </p>
              <div className="adminRow" style={{ flexWrap: "wrap", gap: 10, display: "flex" }}>
                {programsList.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 10px",
                      borderRadius: 10,
                      border: p.id === program!.id ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <a
                      href={`/admin/${id}?program=${p.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: p.id === program!.id ? 700 : 400,
                      }}
                    >
                      {p.week_start_date ?? "без дати"} · {p.is_active ? "Активна" : "Чернетка"}
                    </a>
                    {!p.is_active && (
                      <form action={activateProgram}>
                        <input type="hidden" name="clientId" value={id} />
                        <input type="hidden" name="programId" value={p.id} />
                        <button type="submit" className="adminDeleteBtn">
                          Активувати
                        </button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="authCard">
            <h2 className="cabinetDayTitle">
              Програма тренувань {program!.is_active ? "· Активна (видно клієнту)" : "· Чернетка (клієнт не бачить)"}
            </h2>

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

            <h3 className="cabinetDayTitle" style={{ fontSize: 16, marginTop: 20 }}>
              Зробити нові заміри
            </h3>
            <p className="authNote" style={{ marginBottom: 12 }}>
              Дата виставляється автоматично — сьогодні.
            </p>
            <form action={addMeasurement} className="authForm">
              <input type="hidden" name="clientId" value={id} />
              <div className="adminRow">
                <input name="weight" className="adminRowInput" placeholder="Вага, кг" type="number" step="0.1" min={0} />
                <input name="neck" className="adminRowInput" placeholder="Шия, см" type="number" step="0.1" min={0} />
                <input name="chest" className="adminRowInput" placeholder="Груди, см" type="number" step="0.1" min={0} />
                <input name="waist" className="adminRowInput" placeholder="Талія, см" type="number" step="0.1" min={0} />
              </div>
              <div className="adminRow">
                <input name="hips" className="adminRowInput" placeholder="Таз/стегна, см" type="number" step="0.1" min={0} />
                <input name="thigh" className="adminRowInput" placeholder="Стегно, см" type="number" step="0.1" min={0} />
                <input name="calf" className="adminRowInput" placeholder="Литка, см" type="number" step="0.1" min={0} />
                <input name="biceps" className="adminRowInput" placeholder="Біцепс, см" type="number" step="0.1" min={0} />
              </div>
              <input name="wellbeing" className="authInput" placeholder="Самопочуття (необов'язково)" />
              <input name="comment" className="authInput" placeholder="Коментар (необов'язково)" />
              <button type="submit" className="authButton" style={{ justifySelf: "start" }}>
                Зробити нові заміри
              </button>
            </form>
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
                      <form action={deleteClientPhoto}>
                        <input type="hidden" name="clientId" value={id} />
                        <input type="hidden" name="photoId" value={p.id} />
                        <input type="hidden" name="storagePath" value={p.storage_path} />
                        <button type="submit" className="adminDeleteBtn">
                          Видалити
                        </button>
                      </form>
                    </div>
                  );
                })}
              </div>
            )}

            <h3 className="cabinetDayTitle" style={{ fontSize: 16, marginTop: 20 }}>
              Додати фото
            </h3>
            <form action={uploadClientPhoto} className="authForm">
              <input type="hidden" name="clientId" value={id} />
              <input type="file" name="photo" accept="image/*" required className="authInput" />
              <div className="adminRow">
                <select name="angle" className="adminRowInput" defaultValue="">
                  <option value="">Ракурс</option>
                  <option value="Фронт">Фронт</option>
                  <option value="Профіль">Профіль</option>
                  <option value="Спина">Спина</option>
                </select>
                <input name="date" className="adminRowInput" type="date" />
                <input name="note" className="adminRowInput" placeholder="Коментар (необов'язково)" />
              </div>
              <button type="submit" className="authButton" style={{ justifySelf: "start" }}>
                Завантажити
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
