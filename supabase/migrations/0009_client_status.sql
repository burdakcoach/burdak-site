-- Статус клієнта (активний/неактивний у тренера), вільний текст — як level/nutrition_reporting.
alter table clients add column if not exists client_status text;
