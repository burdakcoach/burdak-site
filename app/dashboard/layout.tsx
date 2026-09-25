import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("name, level")
    .eq("auth_user_id", user.id)
    .single();

  return (
    <main>
      <section className="authSection">
        <div className="cabinetContainer">
          <div className="cabinetHeader">
            <div>
              <h1 className="sectionTitle">
                {client?.name ? `Привіт, ${client.name}` : "Кабінет"}
              </h1>
              <p className="authNote">
                {client?.level ? `Рівень: ${client.level}` : "Профіль ще не заповнено тренером."}
              </p>
            </div>
            <SignOutButton />
          </div>

          <nav className="cabinetNav">
            <Link href="/dashboard" className="cabinetNavLink">
              Сьогодні
            </Link>
            <Link href="/dashboard/progress" className="cabinetNavLink">
              Прогрес
            </Link>
            <Link href="/dashboard/profile" className="cabinetNavLink">
              Мої дані
            </Link>
          </nav>

          {children}
        </div>
      </section>
    </main>
  );
}
