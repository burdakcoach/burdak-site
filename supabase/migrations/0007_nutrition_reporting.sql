-- Трекер регулярності звітності по харчуванню (скріншоти з FatSecret тощо).
-- Вільний текст, а не enum — як level/activity_level, бо тренеру зручніше
-- писати словами ("регулярно", "раз на тиждень", "не звітує з серпня").
alter table clients add column if not exists nutrition_reporting text;
