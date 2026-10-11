-- Щоденний лог позначок тренера про звітність клієнта по харчуванню.
-- Одна позначка на клієнта на день (upsert по client_id+date), щоб можна
-- було порахувати, скільки днів у поточному місяці клієнт "не звітує".
create table if not exists nutrition_status_log (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  date date not null default current_date,
  status text not null check (status in ('Регулярно', 'Нерегулярно', 'Не звітує')),
  created_at timestamptz not null default now(),
  unique (client_id, date)
);

alter table nutrition_status_log enable row level security;

create policy "nutrition_status_log_coach_all" on nutrition_status_log
  for all using (public.is_coach()) with check (public.is_coach());
