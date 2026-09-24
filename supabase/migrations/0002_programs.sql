-- Фаза 1: програми тренувань, вправи, журнал виконання.

create or replace function public.is_coach()
returns boolean
language sql
security definer
stable
as $$
  select exists (select 1 from public.clients c where c.id = auth.uid() and c.role = 'coach');
$$;

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  week_start_date date not null default current_date,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists exercises (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs(id) on delete cascade,
  day_label text not null,
  block text,
  name text not null,
  target_group text,
  sets integer,
  reps text,
  tempo text,
  rir text,
  rest_sec integer,
  technique_note text,
  mistakes_note text,
  alt_exercise text,
  start_weight text,
  coach_comment text,
  order_index integer not null default 0
);

create table if not exists workout_logs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  exercise_id uuid not null references exercises(id) on delete cascade,
  date date not null default current_date,
  planned_sets integer,
  planned_reps text,
  weight text,
  actual_reps text,
  rpe numeric,
  rir_actual text,
  status text check (status in ('Виконано', 'Пропуск', 'Частково')),
  discomfort_score integer,
  replacement text,
  comment text,
  created_at timestamptz not null default now(),
  unique (client_id, exercise_id, date)
);

alter table programs enable row level security;
alter table exercises enable row level security;
alter table workout_logs enable row level security;

-- programs: клієнт бачить свої, тренер керує всіма.
create policy "programs_select" on programs
  for select using (client_id = auth.uid() or public.is_coach());

create policy "programs_write" on programs
  for all using (public.is_coach()) with check (public.is_coach());

-- exercises: доступ через програму.
create policy "exercises_select" on exercises
  for select using (
    exists (
      select 1 from programs p
      where p.id = exercises.program_id
        and (p.client_id = auth.uid() or public.is_coach())
    )
  );

create policy "exercises_write" on exercises
  for all using (public.is_coach()) with check (public.is_coach());

-- workout_logs: клієнт логує тільки себе і тільки по своїх вправах, тренер бачить/редагує все.
create policy "workout_logs_select" on workout_logs
  for select using (client_id = auth.uid() or public.is_coach());

create policy "workout_logs_insert" on workout_logs
  for insert with check (
    public.is_coach()
    or (
      client_id = auth.uid()
      and exists (
        select 1 from exercises e
        join programs p on p.id = e.program_id
        where e.id = workout_logs.exercise_id and p.client_id = workout_logs.client_id
      )
    )
  );

create policy "workout_logs_update" on workout_logs
  for update using (client_id = auth.uid() or public.is_coach());
