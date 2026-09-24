-- Фаза 0-1: базова таблиця клієнтів поверх Supabase Auth.
-- clients.id = auth.users.id (1:1), пароль/сесію веде сам Supabase Auth.

create table if not exists clients (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'coach')),
  name text not null default '',
  phone text,
  email text,
  level text check (level in ('Standard', 'Advanced', 'Rehab', 'Kids')),
  goal text,
  city text,
  job_type text,
  health_notes text,
  discipline_score numeric,
  created_at timestamptz not null default now()
);

alter table clients enable row level security;

-- Клієнт бачить і редагує тільки свій рядок; тренер (role='coach') бачить усіх.
create policy "clients_select_own_or_coach" on clients
  for select using (
    auth.uid() = id
    or exists (select 1 from clients c where c.id = auth.uid() and c.role = 'coach')
  );

create policy "clients_update_own" on clients
  for update using (auth.uid() = id);

-- Авто-створення рядка в clients при першій реєстрації в auth.users.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.clients (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
