"""
Імпортер CRM_*.xlsx у Supabase.

Читає аркуші "Профіль", "Програма", "Заміри і фото" з кожного файлу і
створює/оновлює клієнта, його програму тренувань та заміри в базі.

Мітки в "Профіль" знаходяться в різних клітинках у різних файлах (файли
не з єдиного шаблону), тому значення шукаються по тексту мітки, а не по
фіксованих координатах. Так само заголовки в "Програма"/"Заміри і фото"
шукаються по тексту, а не по номеру рядка.

Використання:
    python scripts/import_crm.py --folder "D:\\disks 2\\Робота\\CRM"          # dry-run (нічого не пише)
    python scripts/import_crm.py --folder "D:\\disks 2\\Робота\\CRM" --apply  # реальний запис у базу
    python scripts/import_crm.py --file "шлях/до/одного/файлу.xlsx" --apply

Потребує SUPABASE_URL і SUPABASE_SERVICE_ROLE_KEY — беруться з .env.local
у корені проєкту (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).
"""

import argparse
import datetime
import glob
import os
import re
import sys

import openpyxl
import requests

REQUIRED_SHEETS = {"Профіль", "Програма"}

PROFILE_LABELS = {
    "піб": "name",
    "рівень": "level",
    "ціль": "goal",
    "вік": "age",
    "зріст": "height_cm",
    "вага": "start_weight",
    "дата старту": "start_date",
    "тренувань/тиждень": "training_frequency",
    "активність": "activity_level",
    "пріоритети": "priorities",
    "пріоритетна зона": "priorities",
    "обмеження": "health_notes",
    "місто": "city",
    "статус": "job_type",
}

PROGRAM_HEADERS = {
    "день": "day_label",
    "блок": "block",
    "вправа": "name",
    "цільова група": "target_group",
    "підходи": "sets",
    "повторення": "reps",
    "темп": "tempo",
    "rir": "rir",
    "відпочинок": "rest_sec",
    "ключова техніка": "technique_note",
    "типові помилки": "mistakes_note",
    "альтернатива": "alt_exercise",
    "вага старт": "start_weight",
    "коментар тренера": "coach_comment",
}

MEASUREMENT_HEADERS = {
    "дата": "date",
    "вага": "weight",
    "шия": "neck",
    "груди": "chest",
    "талія": "waist",
    "таз/стегна": "hips",
    "таз": "hips",
    "стегно": "thigh",
    "литка": "calf",
    "біцепс": "biceps",
    "самопочуття": "wellbeing",
    "коментар": "comment",
}


def clean_label(text):
    return str(text).strip().rstrip(":").lower()


def load_env(project_root):
    env = {}
    env_path = os.path.join(project_root, ".env.local")
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            m = re.match(r"^([A-Z_]+)=(.*)$", line.strip())
            if m:
                env[m.group(1)] = m.group(2).strip('"')
    return env


def scan_labels(ws, label_map, max_row=25, max_col=20):
    """Шукає в аркуші клітинки з текстом мітки і бере значення з сусідньої клітинки праворуч."""
    result = {}
    for r in range(1, min(ws.max_row, max_row) + 1):
        for c in range(1, min(ws.max_column, max_col) + 1):
            cell_val = ws.cell(row=r, column=c).value
            if not isinstance(cell_val, str):
                continue
            key = clean_label(cell_val)
            if key in label_map:
                field = label_map[key]
                if field in result:
                    continue  # перше знайдене значення виграє
                value = ws.cell(row=r, column=c + 1).value
                if value is not None and str(value).strip() != "":
                    result[field] = value
    return result


def find_header_row(ws, header_map, max_row=10, max_col=20):
    """Знаходить рядок-заголовок (де є хоча б 2 відомі заголовки) і мапу колонка->поле."""
    best_row, best_cols, best_score = None, {}, 0
    for r in range(1, min(ws.max_row, max_row) + 1):
        cols = {}
        for c in range(1, min(ws.max_column, max_col) + 1):
            cell_val = ws.cell(row=r, column=c).value
            if not isinstance(cell_val, str):
                continue
            key = clean_label(cell_val)
            if key in header_map:
                cols[c] = header_map[key]
        if len(cols) > best_score:
            best_row, best_cols, best_score = r, cols, len(cols)
    if best_score < 2:
        return None, {}
    return best_row, best_cols


def parse_int(value):
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return int(value)
    m = re.search(r"-?\d+", str(value))
    return int(m.group()) if m else None


def parse_number(value):
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value)
    m = re.search(r"-?\d+[.,]?\d*", str(value))
    if not m:
        return None
    return float(m.group().replace(",", "."))


def parse_date(value):
    if value is None:
        return None
    if isinstance(value, datetime.datetime):
        return value.date().isoformat()
    if isinstance(value, datetime.date):
        return value.isoformat()
    s = str(value).strip()
    for fmt in ("%d.%m.%Y", "%Y-%m-%d", "%d.%m.%y"):
        try:
            return datetime.datetime.strptime(s, fmt).date().isoformat()
        except ValueError:
            continue
    return None


def parse_profile(ws):
    raw = scan_labels(ws, PROFILE_LABELS)
    profile = {}
    if raw.get("name"):
        profile["name"] = str(raw["name"]).strip()
    if raw.get("level"):
        profile["level"] = str(raw["level"]).strip()
    if raw.get("goal"):
        profile["goal"] = str(raw["goal"]).strip()
    if raw.get("age") is not None:
        profile["age"] = parse_int(raw["age"])
    if raw.get("height_cm") is not None:
        profile["height_cm"] = parse_number(raw["height_cm"])
    if raw.get("start_weight"):
        profile["start_weight"] = str(raw["start_weight"]).strip()
    if raw.get("start_date"):
        profile["start_date"] = parse_date(raw["start_date"])
    if raw.get("training_frequency"):
        profile["training_frequency"] = str(raw["training_frequency"]).strip()
    if raw.get("activity_level"):
        profile["activity_level"] = str(raw["activity_level"]).strip()
    if raw.get("priorities"):
        profile["priorities"] = str(raw["priorities"]).strip()
    if raw.get("health_notes"):
        profile["health_notes"] = str(raw["health_notes"]).strip()
    if raw.get("city"):
        profile["city"] = str(raw["city"]).strip()
    if raw.get("job_type"):
        profile["job_type"] = str(raw["job_type"]).strip()
    return profile


def parse_program(ws):
    header_row, cols = find_header_row(ws, PROGRAM_HEADERS)
    if header_row is None:
        return []

    exercises = []
    order_index = 0
    for r in range(header_row + 1, ws.max_row + 1):
        row = {}
        for c, field in cols.items():
            row[field] = ws.cell(row=r, column=c).value
        name = row.get("name")
        if not name or not str(name).strip():
            continue

        exercises.append(
            {
                "day_label": str(row.get("day_label") or "").strip() or "День 1",
                "block": _s(row.get("block")),
                "name": str(name).strip(),
                "target_group": _s(row.get("target_group")),
                "sets": parse_int(row.get("sets")),
                "reps": _s(row.get("reps")),
                "tempo": _s(row.get("tempo")),
                "rir": _s(row.get("rir")),
                "rest_sec": parse_int(row.get("rest_sec")),
                "technique_note": _s(row.get("technique_note")),
                "mistakes_note": _s(row.get("mistakes_note")),
                "alt_exercise": _s(row.get("alt_exercise")),
                "start_weight": _s(row.get("start_weight")),
                "coach_comment": _s(row.get("coach_comment")),
                "order_index": order_index,
            }
        )
        order_index += 1
    return exercises


def parse_measurements(ws):
    header_row, cols = find_header_row(ws, MEASUREMENT_HEADERS)
    if header_row is None:
        return []

    measurements = []
    for r in range(header_row + 1, ws.max_row + 1):
        row = {}
        for c, field in cols.items():
            row[field] = ws.cell(row=r, column=c).value
        date = parse_date(row.get("date"))
        if not date:
            continue

        measurements.append(
            {
                "date": date,
                "weight": parse_number(row.get("weight")),
                "neck": parse_number(row.get("neck")),
                "chest": parse_number(row.get("chest")),
                "waist": parse_number(row.get("waist")),
                "hips": parse_number(row.get("hips")),
                "thigh": parse_number(row.get("thigh")),
                "calf": parse_number(row.get("calf")),
                "biceps": parse_number(row.get("biceps")),
                "wellbeing": _s(row.get("wellbeing")),
                "comment": _s(row.get("comment")),
            }
        )
    return measurements


def _s(value):
    if value is None:
        return None
    s = str(value).strip()
    return s if s else None


def name_from_filename(path):
    base = os.path.splitext(os.path.basename(path))[0]
    base = re.sub(r"^CRM_", "", base)
    parts = base.split("_")
    # відкидаємо хвостові частини типу PRO/Standard/Advanced/Hybrid/2/0 і т.д. — лишаємо перші два слова як ім'я
    return " ".join(parts[:2]).replace("_", " ")


class Supabase:
    def __init__(self, url, service_key):
        self.base = url.rstrip("/") + "/rest/v1"
        self.headers = {
            "apikey": service_key,
            "Authorization": f"Bearer {service_key}",
            "Content-Type": "application/json",
        }

    def select(self, table, params):
        r = requests.get(f"{self.base}/{table}", headers=self.headers, params=params, timeout=30)
        r.raise_for_status()
        return r.json()

    def insert(self, table, payload):
        headers = {**self.headers, "Prefer": "return=representation"}
        r = requests.post(f"{self.base}/{table}", headers=headers, json=payload, timeout=30)
        if not r.ok:
            raise RuntimeError(f"POST {table} failed: {r.status_code} {r.text}")
        return r.json()


def process_file(path, sb, apply_changes):
    wb = openpyxl.load_workbook(path, data_only=True)
    sheet_names = set(wb.sheetnames)

    if not REQUIRED_SHEETS.issubset(sheet_names):
        print(f"ПРОПУСК (старий формат, немає Профіль/Програма): {os.path.basename(path)}")
        return None

    profile = parse_profile(wb["Профіль"])
    if not profile.get("name"):
        profile["name"] = name_from_filename(path)
        print(f"  УВАГА: ім'я не знайдено в аркуші, використано з назви файлу: {profile['name']}")

    exercises = parse_program(wb["Програма"])
    measurements = parse_measurements(wb["Заміри і фото"]) if "Заміри і фото" in sheet_names else []

    print(f"\n{os.path.basename(path)}")
    print(f"  Клієнт: {profile.get('name')} | Рівень: {profile.get('level')}")
    print(f"  Вправ у програмі: {len(exercises)}")
    print(f"  Записів замірів: {len(measurements)}")

    if not apply_changes:
        return {"name": profile.get("name"), "exercises": len(exercises), "measurements": len(measurements)}

    existing = sb.select("clients", {"name": f"eq.{profile['name']}", "select": "id"})
    if existing:
        print(f"  ПРОПУСК запису: клієнт '{profile['name']}' вже є в базі (id={existing[0]['id']})")
        return {"name": profile.get("name"), "skipped": True}

    client_row = sb.insert("clients", {**profile, "role": "client"})[0]
    client_id = client_row["id"]

    program_row = sb.insert(
        "programs",
        {
            "client_id": client_id,
            "is_active": True,
            "week_start_date": profile.get("start_date") or datetime.date.today().isoformat(),
        },
    )[0]
    program_id = program_row["id"]

    if exercises:
        for ex in exercises:
            ex["program_id"] = program_id
        sb.insert("exercises", exercises)

    if measurements:
        for m in measurements:
            m["client_id"] = client_id
        sb.insert("measurements", measurements)

    print(f"  ЗАПИСАНО: client_id={client_id}")
    return {"name": profile.get("name"), "client_id": client_id, "exercises": len(exercises), "measurements": len(measurements)}


def main():
    parser = argparse.ArgumentParser(description="Імпорт CRM_*.xlsx у Supabase")
    parser.add_argument("--folder", help="Папка з файлами CRM_*.xlsx")
    parser.add_argument("--file", help="Один файл для імпорту/тесту")
    parser.add_argument("--apply", action="store_true", help="Реально писати в базу (без цього — dry-run)")
    args = parser.parse_args()

    if not args.folder and not args.file:
        print("Вкажи --folder або --file")
        sys.exit(1)

    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    env = load_env(project_root)
    url = env.get("NEXT_PUBLIC_SUPABASE_URL")
    key = env.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        print("Не знайдено NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY у .env.local")
        sys.exit(1)

    sb = Supabase(url, key)

    files = [args.file] if args.file else sorted(glob.glob(os.path.join(args.folder, "*.xlsx")))

    if not args.apply:
        print("=== DRY RUN (нічого не записується у базу; додай --apply для реального запису) ===")

    results = []
    for path in files:
        try:
            res = process_file(path, sb, args.apply)
            if res:
                results.append(res)
        except Exception as e:
            print(f"  ПОМИЛКА при обробці {os.path.basename(path)}: {e}")

    print("\n=== ПІДСУМОК ===")
    print(f"Файлів оброблено: {len(results)} з {len(files)}")
    if args.apply:
        skipped = sum(1 for r in results if r.get("skipped"))
        written = len(results) - skipped
        print(f"Записано нових клієнтів: {written}")
        print(f"Пропущено (вже є в базі): {skipped}")


if __name__ == "__main__":
    main()
