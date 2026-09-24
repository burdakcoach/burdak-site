-- Фікс: політика clients_select_own_or_coach з 0001 посилалась сама на себе
-- (select ... from clients ...) і Postgres кидав "infinite recursion detected
-- in policy for relation clients". Переводимо на is_coach() (SECURITY DEFINER,
-- обходить RLS зсередини) — так само, як уже зроблено для programs/exercises/workout_logs.

drop policy if exists "clients_select_own_or_coach" on clients;

create policy "clients_select_own_or_coach" on clients
  for select using (auth.uid() = id or public.is_coach());
