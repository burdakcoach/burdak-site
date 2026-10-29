import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadPhoto, deletePhoto } from "./actions";

type Photo = {
  id: string;
  date: string;
  angle: string | null;
  note: string | null;
  storage_path: string;
};

type Measurement = {
  id: string;
  date: string;
  weight: number | null;
  neck: number | null;
  chest: number | null;
  waist: number | null;
  hips: number | null;
  thigh: number | null;
  calf: number | null;
  biceps: number | null;
  wellbeing: string | null;
  comment: string | null;
};

type StrengthPoint = { date: string; weight: number; reps: string | null };
type StrengthSeries = { id: string; name: string; points: StrengthPoint[] };

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit" });
}

function pickTickIndices(length: number, maxTicks = 6): number[] {
  if (length <= maxTicks) return Array.from({ length }, (_, i) => i);
  const step = (length - 1) / (maxTicks - 1);
  const indices = new Set<number>();
  for (let i = 0; i < maxTicks; i++) indices.add(Math.round(i * step));
  return Array.from(indices).sort((a, b) => a - b);
}

function ExerciseStrengthChart({ name, points }: { name: string; points: StrengthPoint[] }) {
  const width = 600;
  const plotHeight = 170;
  const svgHeight = plotHeight + 36;
  const padding = 24;
  const topPadding = 32;

  const weights = points.map((p) => p.weight);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * (width - padding * 2);
    const y =
      plotHeight -
      padding -
      ((p.weight - min) / range) * (plotHeight - padding - topPadding);
    return { x, y, ...p };
  });

  const path = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const latest = points[points.length - 1];
  const tickIndices = pickTickIndices(points.length);

  return (
    <div className="exerciseCard">
      <div className="exerciseHeader">
        <span className="exerciseName">{name}</span>
        <span className="exerciseMeta">
          {latest.weight} кг{latest.reps ? ` × ${latest.reps}` : ""}
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${svgHeight}`} className="progressChart">
        <polyline points={path} fill="none" stroke="#fff" strokeWidth={2} />
        {coords.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={3} fill="#fff" />
            <text
              x={c.x}
              y={c.y - 10}
              textAnchor="middle"
              className="progressChartPoint"
            >
              {c.weight}×{c.reps ?? "?"}
            </text>
          </g>
        ))}
        {tickIndices.map((i) => (
          <text
            key={i}
            x={coords[i].x}
            y={svgHeight - 4}
            textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
            className="progressChartLabel"
          >
            {formatShortDate(points[i].date)}
          </text>
        ))}
        <text x={padding} y={14} className="progressChartLabel">
          {max} кг
        </text>
        <text x={padding} y={plotHeight - 8} className="progressChartLabel">
          {min} кг
        </text>
      </svg>
    </div>
  );
}

function WeightChart({ measurements }: { measurements: Measurement[] }) {
  const points = measurements.filter((m) => m.weight != null);
  if (points.length < 2) return null;

  const width = 600;
  const plotHeight = 190;
  const svgHeight = plotHeight + 36;
  const padding = 24;
  const topPadding = 32;

  const weights = points.map((p) => p.weight as number);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * (width - padding * 2);
    const y =
      plotHeight -
      padding -
      ((p.weight! - min) / range) * (plotHeight - padding - topPadding);
    return { x, y, weight: p.weight, date: p.date };
  });

  const path = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const tickIndices = pickTickIndices(points.length);

  return (
    <svg viewBox={`0 0 ${width} ${svgHeight}`} className="progressChart">
      <polyline points={path} fill="none" stroke="#fff" strokeWidth={2} />
      {coords.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r={3} fill="#fff" />
          <text x={c.x} y={c.y - 10} textAnchor="middle" className="progressChartPoint">
            {c.weight}
          </text>
        </g>
      ))}
      {tickIndices.map((i) => (
        <text
          key={i}
          x={coords[i].x}
          y={svgHeight - 4}
          textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
          className="progressChartLabel"
        >
          {formatShortDate(points[i].date)}
        </text>
      ))}
      <text x={padding} y={14} className="progressChartLabel">
        {max} кг
      </text>
      <text x={padding} y={plotHeight - 8} className="progressChartLabel">
        {min} кг
      </text>
    </svg>
  );
}

export default async function ProgressPage() {
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

  const { data: measurements } = client
    ? await supabase
        .from("measurements")
        .select("id, date, weight, neck, chest, waist, hips, thigh, calf, biceps, wellbeing, comment")
        .eq("client_id", client.id)
        .order("date", { ascending: true })
    : { data: [] as Measurement[] };

  const rows = (measurements || []) as Measurement[];

  const { data: strengthLogsRaw } = client
    ? await supabase
        .from("workout_logs")
        .select("exercise_id, date, weight, actual_reps, exercises(name)")
        .eq("client_id", client.id)
        .not("weight", "is", null)
        .order("date", { ascending: true })
    : { data: [] };

  const strengthByExercise = new Map<string, StrengthSeries>();
  (strengthLogsRaw || []).forEach((l) => {
    const weightNum = l.weight ? parseFloat(l.weight.replace(",", ".")) : NaN;
    if (Number.isNaN(weightNum)) return;
    const exerciseRef = l.exercises as unknown as { name: string } | { name: string }[] | null;
    const exerciseName = Array.isArray(exerciseRef) ? exerciseRef[0]?.name : exerciseRef?.name;
    if (!strengthByExercise.has(l.exercise_id)) {
      strengthByExercise.set(l.exercise_id, {
        id: l.exercise_id,
        name: exerciseName || "Вправа",
        points: [],
      });
    }
    strengthByExercise.get(l.exercise_id)!.points.push({
      date: l.date,
      weight: weightNum,
      reps: l.actual_reps,
    });
  });

  const strengthCharts = Array.from(strengthByExercise.values()).filter(
    (s) => s.points.length >= 2
  );

  const { data: photos } = client
    ? await supabase
        .from("photos")
        .select("id, date, angle, note, storage_path")
        .eq("client_id", client.id)
        .order("date", { ascending: false })
    : { data: [] as Photo[] };

  const photoRows = (photos || []) as Photo[];
  const photoUrls = new Map<string, string>();
  if (photoRows.length > 0) {
    const { data: signed } = await supabase.storage
      .from("photos")
      .createSignedUrls(
        photoRows.map((p) => p.storage_path),
        3600
      );
    (signed || []).forEach((s) => {
      if (s.signedUrl) photoUrls.set(s.path ?? "", s.signedUrl);
    });
  }

  return (
    <>
    <div className="authCard">
      <h2 className="cabinetDayTitle">Прогрес</h2>

      {rows.length === 0 && <p className="authNote">Тренер ще не додав жодного заміру.</p>}

      {rows.length > 0 && (
        <>
          <WeightChart measurements={rows} />

          <div className="progressTableWrap">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Вага</th>
                  <th>Шия</th>
                  <th>Груди</th>
                  <th>Талія</th>
                  <th>Таз/стегна</th>
                  <th>Стегно</th>
                  <th>Литка</th>
                  <th>Біцепс</th>
                  <th>Самопочуття</th>
                </tr>
              </thead>
              <tbody>
                {[...rows].reverse().map((m) => (
                  <tr key={m.id}>
                    <td>{m.date}</td>
                    <td>{m.weight ?? "—"}</td>
                    <td>{m.neck ?? "—"}</td>
                    <td>{m.chest ?? "—"}</td>
                    <td>{m.waist ?? "—"}</td>
                    <td>{m.hips ?? "—"}</td>
                    <td>{m.thigh ?? "—"}</td>
                    <td>{m.calf ?? "—"}</td>
                    <td>{m.biceps ?? "—"}</td>
                    <td>{m.wellbeing ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>

    <div className="authCard">
      <h2 className="cabinetDayTitle">Силові показники</h2>

      {strengthCharts.length === 0 && (
        <p className="authNote">
          Ще не накопичилось достатньо даних — потрібно хоча б 2 тренування з записаною вагою
          по одній вправі.
        </p>
      )}

      {strengthCharts.map((s) => (
        <ExerciseStrengthChart key={s.id} name={s.name} points={s.points} />
      ))}
    </div>

    <div className="authCard">
      <h2 className="cabinetDayTitle">Фото прогресу</h2>

      <form action={uploadPhoto} className="authForm">
        <input type="file" name="photo" accept="image/*" required className="authInput" />
        <div className="adminRow">
          <select name="angle" className="adminRowInput" defaultValue="">
            <option value="">Ракурс</option>
            <option value="Фронт">Фронт</option>
            <option value="Профіль">Профіль</option>
            <option value="Спина">Спина</option>
          </select>
          <input name="note" className="adminRowInput" placeholder="Коментар (необов'язково)" />
        </div>
        <button type="submit" className="authButton" style={{ justifySelf: "start" }}>
          Завантажити
        </button>
      </form>

      {photoRows.length === 0 && (
        <p className="authNote" style={{ marginTop: 16 }}>
          Фото ще не завантажені.
        </p>
      )}

      {photoRows.length > 0 && (
        <div className="photoGrid">
          {photoRows.map((p) => {
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
                <form action={deletePhoto}>
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
    </div>
    </>
  );
}
