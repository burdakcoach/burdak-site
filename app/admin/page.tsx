import Link from "next/link";
import { requireCoach } from "@/lib/supabase/guards";

type WorkoutLog = {
  client_id: string;
  status: string | null;
  rpe: number | null;
};

function formatPercent(value: number | null) {
  return value == null ? "—" : `${Math.round(value * 100)}%`;
}

function formatRpe(value: number | null) {
  return value == null ? "—" : value.toFixed(1);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level: levelFilter } = await searchParams;
  const { supabase } = await requireCoach();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, email, level, role")
    .order("name", { ascending: true });

  const realClients = (clients || []).filter((c) => c.role !== "coach");
  const clientIds = realClients.map((c) => c.id);

  const { data: logs } =
    clientIds.length > 0
      ? await supabase
          .from("workout_logs")
          .select("client_id, status, rpe")
          .in("client_id", clientIds)
      : { data: [] as WorkoutLog[] };

  const kpiByClient = new Map<string, { attendance: number | null; avgRpe: number | null }>();
  realClients.forEach((c) => {
    const clientLogs = (logs || []).filter((l) => l.client_id === c.id);
    const doneCount = clientLogs.filter((l) => l.status === "Виконано").length;
    const attendance = clientLogs.length > 0 ? doneCount / clientLogs.length : null;

    const rpeValues = clientLogs.map((l) => l.rpe).filter((v): v is number => v != null);
    const avgRpe =
      rpeValues.length > 0 ? rpeValues.reduce((sum, v) => sum + v, 0) / rpeValues.length : null;

    kpiByClient.set(c.id, { attendance, avgRpe });
  });

  const levels = Array.from(new Set(realClients.map((c) => c.level).filter(Boolean))) as string[];
  const filteredClients = levelFilter
    ? realClients.filter((c) => c.level === levelFilter)
    : realClients;

  return (
    <main>
      <section className="authSection">
        <div className="cabinetContainer" style={{ maxWidth: 960 }}>
          <h1 className="sectionTitle">Клієнти</h1>

          {levels.length > 0 && (
            <form method="get" className="adminRow" style={{ gridTemplateColumns: "auto auto" }}>
              <select name="level" className="adminRowInput" defaultValue={levelFilter || ""}>
                <option value="">Усі рівні</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              <button type="submit" className="authButton">
                Фільтр
              </button>
            </form>
          )}

          <div className="authCard">
            {filteredClients.length === 0 && (
              <p className="authNote">Клієнтів із цим рівнем немає.</p>
            )}

            {filteredClients.length > 0 && (
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Ім'я</th>
                    <th>Рівень</th>
                    <th>Відвідуваність</th>
                    <th>Сер. RPE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((c) => {
                    const kpi = kpiByClient.get(c.id);
                    return (
                      <tr key={c.id}>
                        <td>{c.name || "—"}</td>
                        <td>{c.level || "—"}</td>
                        <td>{formatPercent(kpi?.attendance ?? null)}</td>
                        <td>{formatRpe(kpi?.avgRpe ?? null)}</td>
                        <td>
                          <Link href={`/admin/${c.id}`} className="authNote">
                            Відкрити →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
