import Link from "next/link";
import { requireCoach } from "@/lib/supabase/guards";

export default async function AdminPage() {
  const { supabase } = await requireCoach();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, email, level, role")
    .order("name", { ascending: true });

  const realClients = (clients || []).filter((c) => c.role !== "coach");

  return (
    <main>
      <section className="authSection">
        <div className="cabinetContainer" style={{ maxWidth: 880 }}>
          <h1 className="sectionTitle">Клієнти</h1>

          <div className="authCard">
            {realClients.length === 0 && (
              <p className="authNote">Поки немає клієнтів — вони з'являться тут одразу після реєстрації.</p>
            )}

            {realClients.length > 0 && (
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>Ім'я</th>
                    <th>Email</th>
                    <th>Рівень</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {realClients.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name || "—"}</td>
                      <td>{c.email}</td>
                      <td>{c.level || "—"}</td>
                      <td>
                        <Link href={`/admin/${c.id}`} className="authNote">
                          Відкрити →
                        </Link>
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
