import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { kyivToday } from "@/lib/weekdays";
import { deleteNutritionScreenshot } from "./actions";
import UploadForm from "./UploadForm";

type Screenshot = {
  id: string;
  date: string;
  storage_path: string;
};

export default async function NutritionPage() {
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

  const today = kyivToday();
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const sinceDate = since.toISOString().slice(0, 10);

  const { data: screenshots } = client
    ? await supabase
        .from("nutrition_screenshots")
        .select("id, date, storage_path")
        .eq("client_id", client.id)
        .gte("date", sinceDate)
        .order("date", { ascending: false })
    : { data: [] as Screenshot[] };

  const rows = (screenshots || []) as Screenshot[];
  const uploadedToday = rows.some((r) => r.date === today);

  const urls = new Map<string, string>();
  if (rows.length > 0) {
    const { data: signed } = await supabase.storage
      .from("nutrition-screenshots")
      .createSignedUrls(
        rows.map((r) => r.storage_path),
        3600
      );
    (signed || []).forEach((s) => {
      if (s.signedUrl) urls.set(s.path ?? "", s.signedUrl);
    });
  }

  return (
    <div className="authCard">
      <h2 className="cabinetDayTitle">Харчування — скріни</h2>
      <p className="authNote" style={{ marginBottom: 16 }}>
        Скидай сюди скрін зі свого щоденника харчування (напр. FatSecret) — один на день. Тренер
        побачить без того, щоб ти писав йому окремо.
      </p>

      <UploadForm uploadedToday={uploadedToday} />

      {rows.length === 0 && (
        <p className="authNote" style={{ marginTop: 16 }}>
          Скрінів ще немає.
        </p>
      )}

      {rows.length > 0 && (
        <div className="photoGrid" style={{ marginTop: 16 }}>
          {rows.map((r) => {
            const url = urls.get(r.storage_path);
            return (
              <div key={r.id} className="photoCard">
                {url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt={`Харчування ${r.date}`} className="photoImage" />
                )}
                <p className="authNote">{r.date}</p>
                <form action={deleteNutritionScreenshot}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="storagePath" value={r.storage_path} />
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
  );
}
