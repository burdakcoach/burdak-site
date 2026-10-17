import Link from "next/link";
import { requireCoach } from "@/lib/supabase/guards";
import { findUnmatchedCalendarNames } from "@/lib/calendarAudit";
import { createNewClient } from "../actions";

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export default async function CalendarCheckPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { supabase } = await requireCoach();
  const { from, to } = await searchParams;

  const fromDate = from || isoDaysAgo(30);
  const toDate = to || isoDaysAgo(-7);

  const { data: clients } = await supabase
    .from("clients")
    .select("name")
    .eq("role", "client");

  const clientNames = (clients ?? []).map((c) => c.name).filter(Boolean) as string[];

  let unmatched: Awaited<ReturnType<typeof findUnmatchedCalendarNames>> = [];
  let error: string | null = null;
  try {
    unmatched = await findUnmatchedCalendarNames(
      clientNames,
      new Date(`${fromDate}T00:00:00+03:00`).toISOString(),
      new Date(`${toDate}T23:59:59+03:00`).toISOString()
    );
  } catch (e) {
    error = e instanceof Error ? e.message : "Не вдалося прочитати календар";
  }

  return (
    <main>
      <section className="authSection">
        <div className="cabinetContainer" style={{ maxWidth: 880 }}>
          <Link href="/admin" className="backLink">
            ← Усі клієнти
          </Link>

          <div className="authCard">
            <h1 className="sectionTitle">Перевірка календаря</h1>
            <p className="authNote" style={{ marginTop: 8, marginBottom: 16 }}>
              Записи в Google Calendar за обраний період, які не збігаються з жодним клієнтом у
              базі — побутові записи (сніданок/обід/сон тощо) вже відфільтровані.
            </p>

            <form method="get" className="adminRow" style={{ gridTemplateColumns: "auto auto auto" }}>
              <input type="date" name="from" className="adminRowInput" defaultValue={fromDate} />
              <input type="date" name="to" className="adminRowInput" defaultValue={toDate} />
              <button type="submit" className="authButton">
                Перевірити
              </button>
            </form>
          </div>

          <div className="authCard">
            {error && <p className="authNote">Помилка: {error}</p>}

            {!error && unmatched.length === 0 && (
              <p className="authNote">Нічого не знайдено — усі записи за період збігаються з клієнтами 🎉</p>
            )}

            {!error && unmatched.length > 0 && (
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Назва в календарі</th>
                    <th>Разів</th>
                    <th>Перший / останній раз</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {unmatched.map((u) => (
                    <tr key={u.title}>
                      <td>{u.title}</td>
                      <td>{u.count}</td>
                      <td>
                        {u.firstDate === u.lastDate ? u.firstDate : `${u.firstDate} – ${u.lastDate}`}
                      </td>
                      <td>
                        <form action={createNewClient}>
                          <input type="hidden" name="name" value={u.title} />
                          <button type="submit" className="authButton" style={{ fontSize: 13, padding: "6px 10px" }}>
                            + Додати як клієнта
                          </button>
                        </form>
                      </td>
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
