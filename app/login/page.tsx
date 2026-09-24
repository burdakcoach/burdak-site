"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [mode, setMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError("Невірний email або пароль");
      return;
    }
    router.push(redirectTo);
    router.refresh();
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
      },
    });

    setLoading(false);
    if (error) {
      setError("Не вдалося надіслати посилання");
      return;
    }
    setMagicSent(true);
  }

  return (
    <main>
      <section className="authSection">
        <div className="authContainer">
          <a href="/" className="backLink">← На головну</a>

          <div className="authCard">
            <h1 className="sectionTitle">Кабінет клієнта</h1>

            <div className="authTabs">
              <button
                type="button"
                className={mode === "password" ? "authTabActive" : "authTab"}
                onClick={() => { setMode("password"); setError(""); setMagicSent(false); }}
              >
                Пароль
              </button>
              <button
                type="button"
                className={mode === "magic" ? "authTabActive" : "authTab"}
                onClick={() => { setMode("magic"); setError(""); setMagicSent(false); }}
              >
                Посилання на email
              </button>
            </div>

            {mode === "password" ? (
              <form className="authForm" onSubmit={handlePasswordLogin}>
                <input
                  className="authInput"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="authInput"
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="authError">{error}</p>}
                <button className="authButton" type="submit" disabled={loading}>
                  {loading ? "Входимо..." : "Увійти"}
                </button>
              </form>
            ) : magicSent ? (
              <p className="authNote">Перевір пошту — ми надіслали посилання для входу.</p>
            ) : (
              <form className="authForm" onSubmit={handleMagicLink}>
                <input
                  className="authInput"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="authError">{error}</p>}
                <button className="authButton" type="submit" disabled={loading}>
                  {loading ? "Надсилаємо..." : "Надіслати посилання"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
