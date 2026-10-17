-- Скріни харчування (напр. з FatSecret), які клієнт завантажує сам.
-- Один скрін на день (unique client_id+date — повторне завантаження того ж
-- дня замінює попередній запис, старий файл видаляється окремо в коді).
-- Приватний bucket "nutrition-screenshots", шлях: {client_id}/{date}.jpg

insert into storage.buckets (id, name, public)
values ('nutrition-screenshots', 'nutrition-screenshots', false)
on conflict (id) do nothing;

create table if not exists nutrition_screenshots (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  date date not null default current_date,
  storage_path text not null,
  created_at timestamptz not null default now(),
  unique (client_id, date)
);

alter table nutrition_screenshots enable row level security;

create policy "nutrition_screenshots_select" on nutrition_screenshots
  for select using (
    exists (select 1 from clients c where c.id = nutrition_screenshots.client_id and c.auth_user_id = auth.uid())
    or public.is_coach()
  );

create policy "nutrition_screenshots_insert" on nutrition_screenshots
  for insert with check (
    public.is_coach()
    or exists (select 1 from clients c where c.id = nutrition_screenshots.client_id and c.auth_user_id = auth.uid())
  );

create policy "nutrition_screenshots_delete" on nutrition_screenshots
  for delete using (
    public.is_coach()
    or exists (select 1 from clients c where c.id = nutrition_screenshots.client_id and c.auth_user_id = auth.uid())
  );

create policy "nutrition_screenshots_storage_select" on storage.objects
  for select using (
    bucket_id = 'nutrition-screenshots'
    and (
      public.is_coach()
      or exists (
        select 1 from clients c
        where c.auth_user_id = auth.uid()
          and (storage.foldername(name))[1] = c.id::text
      )
    )
  );

create policy "nutrition_screenshots_storage_insert" on storage.objects
  for insert with check (
    bucket_id = 'nutrition-screenshots'
    and (
      public.is_coach()
      or exists (
        select 1 from clients c
        where c.auth_user_id = auth.uid()
          and (storage.foldername(name))[1] = c.id::text
      )
    )
  );

create policy "nutrition_screenshots_storage_delete" on storage.objects
  for delete using (
    bucket_id = 'nutrition-screenshots'
    and (
      public.is_coach()
      or exists (
        select 1 from clients c
        where c.auth_user_id = auth.uid()
          and (storage.foldername(name))[1] = c.id::text
      )
    )
  );
