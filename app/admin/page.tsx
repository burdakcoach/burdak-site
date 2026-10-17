import Link from "next/link";
import { requireCoach } from "@/lib/supabase/guards";
import { kyivToday } from "@/lib/weekdays";
import { createNewClient, logNutritionStatusFromList } from "./actions";

type WorkoutLog = {
  client_id: string;
  status: string | null;
  rpe: number | null;
};

const NUTRITION_COLORS: Record<string, string> = {
  "Регулярно": "#4ade80",
  "Нерегулярно": "#facc15",
  "Не звітує": "#f87171",
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
  searchParams: Promise<{ level?: string; nutrition?: string; status?: string }>;
}) {
  const { level: levelFilter, nutrition: nutritionFilter, status: statusFilter } = await searchParams;
  const { supabase } = await requireCoach();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, email, level, role, client_status")
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

  const today = kyivToday();
  const monthPrefix = today.slice(0, 7); // YYYY-MM

  const { data: nutritionLogs } =
    clientIds.length > 0
      ? await supabase
          .from("nutrition_status_log")
          .select("client_id, date, status")
          .in("client_id", clientIds)
          .order("date", { ascending: false })
      : { data: [] as { client_id: string; date: string; status: string }[] };

  const nutritionByClient = new Map<string, { status: string | null; notReportingCount: number }>();
  realClients.forEach((c) => {
    const clientLogs = (nutritionLogs || []).filter((l) => l.client_id === c.id);
    const status = clientLogs[0]?.status ?? null;
    const notReportingCount = clientLogs.filter(
      (l) => l.date.startsWith(monthPrefix) && l.status === "Не звітує"
    ).length;
    nutritionByClient.set(c.id, { status, notReportingCount });
  });

  const levels = Array.from(new Set(realClients.map((c) => c.level).filter(Boolean))) as string[];
  let filteredClients = levelFilter
    ? realClients.filter((c) => c.level === levelFilter)
    : realClients;
  if (nutritionFilter) {
    filteredClients =
      nutritionFilter === "Не вказано"
        ? filteredClients.filter((c) => !nutritionByClient.get(c.id)?.status)
        : filteredClients.filter((c) => nutritionByClient.get(c.id)?.status === nutritionFilter);
  }
  if (statusFilter) {
    filteredClients =
      statusFilter === "Не вказано"
        ? filteredClients.filter((c) => !c.client_status)
        : filteredClients.filter((c) => c.client_status === statusFilter);
  }

  const returnQuery = new URLSearchParams({
    ...(levelFilter ? { level: levelFilter } : {}),
    ...(nutritionFilter ? { nutrition: nutritionFilter } : {}),
    ...(statusFilter ? { status: statusFilter } : {}),
  }).toString();

  return (
    <main>
      <section className="authSection">
        <div className="cabinetContainer" style={{ maxWidth: 960 }}>
          <h1 className="sectionTitle">Клієнти</h1>

          <Link href="/admin/calendar-check" className="authNote">
            Перевірити календар →
          </Link>

          <details className="authCard">
            <summary className="cabinetDayTitle" style={{ cursor: "pointer" }}>
              + Додати клієнта
            </summary>
            <form action={createNewClient} className="authForm" style={{ marginTop: 16 }}>
              <div className="adminRow">
                <input name="name" className="adminRowInput" placeholder="Ім'я" required />
                <input name="email" className="adminRowInput" placeholder="Email (необов'язково)" type="email" />
                <input name="level" className="adminRowInput" placeholder="Рівень" />
                <input name="goal" className="adminRowInput" placeholder="Ціль" />
              </div>
              <button type="submit" className="authButton" style={{ justifySelf: "start" }}>
                Створити
              </button>
            </form>
          </details>

          <form method="get" className="adminRow" style={{ gridTemplateColumns: "auto auto auto auto" }}>
            {levels.length > 0 && (
              <select name="level" className="adminRowInput" defaultValue={levelFilter || ""}>
                <option value="">Усі рівні</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            )}
            <select name="nutrition" className="adminRowInput" defaultValue={nutritionFilter || ""}>
              <option value="">Звітність по харчуванню — усі</option>
              <option value="Регулярно">Регулярно звітує</option>
              <option value="Нерегулярно">Нерегулярно звітує</option>
              <option value="Не звітує">Не звітує</option>
              <option value="Не вказано">Не вказано</option>
            </select>
            <select name="status" className="adminRowInput" defaultValue={statusFilter || ""}>
              <option value="">Статус клієнта — усі</option>
              <option value="Активний">Активний</option>
              <option value="Неактивний">Неактивний</option>
              <option value="Не вказано">Не вказано</option>
            </select>
            <button type="submit" className="authButton">
              Фільтр
            </button>
          </form>

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
                    <th>Харчування</th>
                    <th>Статус</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((c) => {
                    const kpi = kpiByClient.get(c.id);
                    const nutrition = nutritionByClient.get(c.id);
                    return (
                      <tr key={c.id}>
                        <td>{c.name || "—"}</td>
                        <td>{c.level || "—"}</td>
                        <td>{formatPercent(kpi?.attendance ?? null)}</td>
                        <td>{formatRpe(kpi?.avgRpe ?? null)}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {nutrition?.status && (
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 9,
                                  height: 9,
                                  borderRadius: "50%",
                                  background: NUTRITION_COLORS[nutrition.status] ?? "#999",
                                  flexShrink: 0,
                                }}
                              />
                            )}
                            <form
                              action={logNutritionStatusFromList}
                              style={{ display: "flex", alignItems: "center", gap: 4 }}
                            >
                              <input type="hidden" name="clientId" value={c.id} />
                              <input type="hidden" name="returnQuery" value={returnQuery} />
                              <select
                                name="status"
                                defaultValue={nutrition?.status ?? ""}
                                style={{
                                  fontSize: 12,
                                  padding: "3px 4px",
                                  borderRadius: 6,
                                  background: "rgba(255,255,255,0.04)",
                                  color: "#fff",
                                  border: "1px solid rgba(255,255,255,0.12)",
                                }}
                              >
                                <option value="" disabled>
                                  —
                                </option>
                                <option value="Регулярно">Регулярно</option>
                                <option value="Нерегулярно">Нерегулярно</option>
                                <option value="Не звітує">Не звітує</option>
                              </select>
                              <button
                                type="submit"
                                style={{
                                  fontSize: 12,
                                  padding: "3px 8px",
                                  borderRadius: 6,
                                  border: "1px solid rgba(255,255,255,0.2)",
                                  background: "rgba(255,255,255,0.08)",
                                  color: "#fff",
                                  cursor: "pointer",
                                }}
                              >
                                ✓
                              </button>
                            </form>
                            {nutrition?.status === "Не звітує" && nutrition.notReportingCount > 0 && (
                              <span className="authNote">({nutrition.notReportingCount})</span>
                            )}
                          </div>
                        </td>
                        <td>{c.client_status || "—"}</td>
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
