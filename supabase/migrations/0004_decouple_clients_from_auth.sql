-- Фаза 2: розв'язуємо clients.id від auth.users.id, щоб можна було
-- імпортувати CRM-клієнтів без email/акаунту входу. Профіль клієнта тепер
-- живе окремо; auth_user_id заповнюється, коли клієнт реально заходить
-- у кабінет (лінкується за email) або створюється новим при самостійній
-- реєстрації.

alter table clients add column if not exists auth_user_id uuid unique references auth.users(id) on delete set null;
alter table clients alter column id set default gen_random_uuid();

-- існуючі клієнти (тренер) вже прив'язані через auth.users.id напряму
update clients set auth_user_id = id where auth_user_id is null;

-- "рівень" виявився вільним текстом у реальних даних ("Kids/Youth",
-- "Гібрид Standard + Rehab" тощо) — знімаємо жорсткий список.
alter table clients drop constraint if exists clients_level_check;

-- нові поля з профілю Excel
alter table clients add column if not exists age integer;
alter table clients add column if not exists height_cm numeric;
alter table clients add column if not exists start_weight text;
alter table clients add column if not exists start_date date;
alter table clients add column if not exists training_frequency text;
alter table clients add column if not exists activity_level text;
alter table clients add column if not exists priorities text;

-- is_coach() тепер дивиться через auth_user_id
create or replace function public.is_coach()
returns boolean
language sql
security definer
stable
as $$
  select exists (select 1 from public.clients c where c.auth_user_id = auth.uid() and c.role = 'coach');
$$;

drop policy if exists "clients_select_own_or_coach" on clients;
create policy "clients_select_own_or_coach" on clients
  for select using (auth_user_id = auth.uid() or public.is_coach());

drop policy if exists "clients_update_own" on clients;
create policy "clients_update_own" on clients
  for update using (auth_user_id = auth.uid());

create policy "clients_coach_write" on clients
  for all using (public.is_coach()) with check (public.is_coach());

-- programs/exercises/workout_logs: client_id більше не дорівнює auth.uid(),
-- перевіряємо приналежність через clients.auth_user_id.
drop policy if exists "programs_select" on programs;
create policy "programs_select" on programs
  for select using (
    exists (select 1 from clients c where c.id = programs.client_id and c.auth_user_id = auth.uid())
    or public.is_coach()
  );

drop policy if exists "exercises_select" on exercises;
create policy "exercises_select" on exercises
  for select using (
    exists (
      select 1 from programs p
      join clients c on c.id = p.client_id
      where p.id = exercises.program_id and (c.auth_user_id = auth.uid() or public.is_coach())
    )
  );

drop policy if exists "workout_logs_select" on workout_logs;
create policy "workout_logs_select" on workout_logs
  for select using (
    exists (select 1 from clients c where c.id = workout_logs.client_id and c.auth_user_id = auth.uid())
    or public.is_coach()
  );

drop policy if exists "workout_logs_insert" on workout_logs;
create policy "workout_logs_insert" on workout_logs
  for insert with check (
    public.is_coach()
    or (
      exists (select 1 from clients c where c.id = workout_logs.client_id and c.auth_user_id = auth.uid())
      and exists (
        select 1 from exercises e
        join programs p on p.id = e.program_id
        where e.id = workout_logs.exercise_id and p.client_id = workout_logs.client_id
      )
    )
  );

drop policy if exists "workout_logs_update" on workout_logs;
create policy "workout_logs_update" on workout_logs
  for update using (
    exists (select 1 from clients c where c.id = workout_logs.client_id and c.auth_user_id = auth.uid())
    or public.is_coach()
  );

-- Заміри і фото
create table if not exists measurements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  date date not null,
  weight numeric,
  neck numeric,
  chest numeric,
  waist numeric,
  hips numeric,
  thigh numeric,
  calf numeric,
  biceps numeric,
  wellbeing text,
  comment text,
  created_at timestamptz not null default now(),
  unique (client_id, date)
);

alter table measurements enable row level security;

create policy "measurements_select" on measurements
  for select using (
    exists (select 1 from clients c where c.id = measurements.client_id and c.auth_user_id = auth.uid())
    or public.is_coach()
  );

create policy "measurements_write" on measurements
  for all using (public.is_coach()) with check (public.is_coach());

-- при реєстрації: лінкуємо до вже імпортованого профілю за email,
-- інакше створюємо новий профіль клієнта.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  matched_id uuid;
begin
  select id into matched_id
  from public.clients
  where auth_user_id is null
    and email is not null
    and lower(email) = lower(new.email)
  limit 1;

  if matched_id is not null then
    update public.clients set auth_user_id = new.id where id = matched_id;
  else
    insert into public.clients (id, auth_user_id, email)
    values (gen_random_uuid(), new.id, new.email);
  end if;

  return new;
end;
$$;
