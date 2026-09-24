-- В 0004 додали auth_user_id для розв'язки clients від auth.users, але забули
-- прибрати старий FK на самій колонці id (clients_id_fkey), який досі вимагав
-- існування auth.users-рядка з тим самим id. Прибираємо його — id тепер
-- власний генерований uuid, без прив'язки до auth.users.

alter table clients drop constraint if exists clients_id_fkey;
