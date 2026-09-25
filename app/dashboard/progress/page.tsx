import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

function WeightChart({ measurements }: { measurements: Measurement[] }) {
  const points = measurements.filter((m) => m.weight != null);
  if (points.length < 2) return null;

  const width = 600;
  const height = 180;
  const padding = 24;

  const weights = points.map((p) => p.weight as number);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * (width - padding * 2);
    const y = height - padding - ((p.weight! - min) / range) * (height - padding * 2);
    return { x, y, weight: p.weight, date: p.date };
  });

  const path = coords.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="progressChart">
      <polyline points={path} fill="none" stroke="#fff" strokeWidth={2} />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={3} fill="#fff" />
      ))}
      <text x={padding} y={14} className="progressChartLabel">
        {max} кг
      </text>
      <text x={padding} y={height - 8} className="progressChartLabel">
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

  return (
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
  );
}
