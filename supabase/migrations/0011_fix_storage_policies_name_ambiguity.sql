-- Баг: всередині EXISTS-підзапиту до clients, "storage.foldername(name)"
-- резолвився в clients.name (бо в clients теж є колонка name), а не в
-- storage.objects.name (шлях файлу) — тому ЖОДНЕ самозавантаження клієнта
-- (фото прогресу, скріни харчування) ніколи не проходило RLS. Виправлено
-- явним посиланням на storage.objects.name.

drop policy if exists "nutrition_screenshots_storage_select" on storage.objects;
drop policy if exists "nutrition_screenshots_storage_insert" on storage.objects;
drop policy if exists "nutrition_screenshots_storage_delete" on storage.objects;
drop policy if exists "photos_storage_select" on storage.objects;
drop policy if exists "photos_storage_insert" on storage.objects;
drop policy if exists "photos_storage_delete" on storage.objects;

create policy "nutrition_screenshots_storage_select" on storage.objects
  for select using (
    bucket_id = 'nutrition-screenshots'
    and (
      public.is_coach()
      or exists (
        select 1 from clients c
        where c.auth_user_id = auth.uid()
          and (storage.foldername(storage.objects.name))[1] = c.id::text
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
          and (storage.foldername(storage.objects.name))[1] = c.id::text
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
          and (storage.foldername(storage.objects.name))[1] = c.id::text
      )
    )
  );

create policy "photos_storage_select" on storage.objects
  for select using (
    bucket_id = 'photos'
    and (
      public.is_coach()
      or exists (
        select 1 from clients c
        where c.auth_user_id = auth.uid()
          and (storage.foldername(storage.objects.name))[1] = c.id::text
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
          and (storage.foldername(storage.objects.name))[1] = c.id::text
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
          and (storage.foldername(storage.objects.name))[1] = c.id::text
      )
    )
  );
