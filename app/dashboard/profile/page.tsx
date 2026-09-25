import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const FIELDS: { key: string; label: string }[] = [
  { key: "level", label: "Рівень" },
  { key: "goal", label: "Ціль" },
  { key: "age", label: "Вік" },
  { key: "height_cm", label: "Зріст, см" },
  { key: "start_weight", label: "Вага на старті" },
  { key: "start_date", label: "Дата старту" },
  { key: "training_frequency", label: "Тренувань/тиждень" },
  { key: "activity_level", label: "Активність" },
  { key: "priorities", label: "Пріоритети" },
  { key: "health_notes", label: "Обмеження та застереження" },
  { key: "city", label: "Місто" },
  { key: "job_type", label: "Статус/зайнятість" },
];

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  const filledFields = client
    ? FIELDS.filter((f) => client[f.key] != null && client[f.key] !== "")
    : [];

  return (
    <div className="authCard">
      <h2 className="cabinetDayTitle">Мої дані</h2>

      {(!client || filledFields.length === 0) && (
        <p className="authNote">Профіль ще не заповнено тренером.</p>
      )}

      {filledFields.length > 0 && (
        <dl className="profileList">
          {filledFields.map((f) => (
            <div key={f.key} className="profileRow">
              <dt>{f.label}</dt>
              <dd>{String(client[f.key])}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
