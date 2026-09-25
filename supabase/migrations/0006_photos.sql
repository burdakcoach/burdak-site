-- Фаза 3 (частина 3): фото прогресу клієнта.
-- Приватний bucket "photos", шлях у сховищі: {client_id}/{timestamp}-{ракурс}.jpg

insert into storage.buckets (id, name, public)
values ('photos', 'photos', false)
on conflict (id) do nothing;

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  date date not null default current_date,
  angle text,
  storage_path text not null,
  note text,
  created_at timestamptz not null default now()
);

alter table photos enable row level security;

create policy "photos_select" on photos
  for select using (
    exists (select 1 from clients c where c.id = photos.client_id and c.auth_user_id = auth.uid())
    or public.is_coach()
  );

create policy "photos_insert" on photos
  for insert with check (
    public.is_coach()
    or exists (select 1 from clients c where c.id = photos.client_id and c.auth_user_id = auth.uid())
  );

create policy "photos_delete" on photos
  for delete using (
    public.is_coach()
    or exists (select 1 from clients c where c.id = photos.client_id and c.auth_user_id = auth.uid())
  );

-- storage.objects: перша частина шляху = clients.id власника фото
create policy "photos_storage_select" on storage.objects
  for select using (
    bucket_id = 'photos'
    and (
      public.is_coach()
      or exists (
        select 1 from clients c
        where c.auth_user_id = auth.uid()
          and (storage.foldername(name))[1] = c.id::text
      )
    )
  );

create policy "photos_storage_insert" on storage.objects
  for insert with check (
    bucket_id = 'photos'
    and (
      public.is_coach()
      or exists (
        select 1 from clients c
        where c.auth_user_id = auth.uid()
          and (storage.foldername(name))[1] = c.id::text
      )
    )
  );

create policy "photos_storage_delete" on storage.objects
  for delete using (
    bucket_id = 'photos'
    and (
      public.is_coach()
      or exists (
        select 1 from clients c
        where c.auth_user_id = auth.uid()
          and (storage.foldername(name))[1] = c.id::text
      )
    )
  );
