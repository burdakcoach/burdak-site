"use client";

import { useMemo, useState } from "react";

type FormState = {
  goal: string;
  currentHealthIssues: string[];
  level: string;
  previousActivity: string;
  experienceDuration: string;
  pain: string;
  seriousIssueType: string;
  jointIssues: string[];
  otherSeriousIssues: string[];
};

const goalOptions = ["Схуднення", "Набір м’язів", "Здоров’я / без болю"];
const levelOptions = ["Новачок", "Середній", "Досвідчений"];
const painOptions = ["Немає", "Є незначні", "Є серйозні"];

const currentHealthIssueOptions = [
  "Біль у спині",
  "Біль у колінах",
  "Біль у шиї",
  "Скутість суглобів",
  "Погана рухливість",
  "Швидка втома",
  "Інше",
];

const previousActivityOptions = [
  "Тренажерний зал",
  "Біг",
  "Кросфіт",
  "Бокс / єдиноборства",
  "Йога / пілатес",
  "Плавання",
  "Командні види спорту",
  "Домашні тренування",
  "Інше",
];

const experienceDurationOptions = [
  "До 6 місяців",
  "6–12 місяців",
  "1–3 роки",
  "3–5 років",
  "5+ років",
];

const seriousIssueTypeOptions = [
  "Проблеми з суглобами",
  "Проблеми із серцем",
  "Варикоз",
  "Діастаз",
  "Грижі / протрузії",
  "Інше",
];

const jointIssueOptions = [
  "Шия",
  "Плечі",
  "Лікті",
  "Кисті",
  "Тазостегнові суглоби",
  "Коліна",
  "Гомілкостоп",
];

const otherSeriousIssueOptions = [
  "Проблеми із серцем",
  "Варикоз",
  "Діастаз",
  "Грижі / протрузії",
  "Інше",
];

export default function Quiz() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<FormState>({
    goal: "",
    currentHealthIssues: [],
    level: "",
    previousActivity: "",
    experienceDuration: "",
    pain: "",
    seriousIssueType: "",
    jointIssues: [],
    otherSeriousIssues: [],
  });

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (
    field: "currentHealthIssues" | "jointIssues" | "otherSeriousIssues",
    value: string
  ) => {
    setForm((prev) => {
      const current = prev[field];
      const exists = current.includes(value);

      return {
        ...prev,
        [field]: exists ? current.filter((item) => item !== value) : [...current, value],
      };
    });
  };

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => Math.max(1, prev - 1));

  const summaryText = useMemo(() => {
    const parts = [
      `Привіт, я пройшов тест.`,
      `Ціль: ${form.goal || "не вказано"}.`,
      `Рівень: ${form.level || "не вказано"}.`,
    ];

    if (form.goal === "Здоров’я / без болю" && form.currentHealthIssues.length > 0) {
      parts.push(`Поточні проблеми зі здоров’ям: ${form.currentHealthIssues.join(", ")}.`);
    }

    if (form.level === "Досвідчений") {
      parts.push(`Попередня активність: ${form.previousActivity || "не вказано"}.`);
      parts.push(`Досвід: ${form.experienceDuration || "не вказано"}.`);
    }

    parts.push(`Біль / травми: ${form.pain || "не вказано"}.`);

    if (form.pain === "Є серйозні") {
      parts.push(`Тип проблеми: ${form.seriousIssueType || "не вказано"}.`);

      if (form.seriousIssueType === "Проблеми з суглобами" && form.jointIssues.length > 0) {
        parts.push(`Які суглоби: ${form.jointIssues.join(", ")}.`);
      }

      if (form.seriousIssueType !== "Проблеми з суглобами" && form.otherSeriousIssues.length > 0) {
        parts.push(`Деталізація: ${form.otherSeriousIssues.join(", ")}.`);
      }
    }

    return encodeURIComponent(parts.join(" "));
  }, [form]);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <section className="max-w-xl mx-auto">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center border border-white/15 bg-white/5 px-4 py-2 rounded-xl text-sm text-gray-300 hover:bg-white hover:text-black transition"
          >
            ← Назад на головну
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-center">
          Оцінка власної фізичної форми
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Кілька коротких питань, щоб зрозуміти твою ситуацію і дати нормальну рекомендацію, а не ворожити.
        </p>

        <div className="mb-8">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${Math.min((step / 7) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Крок {Math.min(step, 7)} з 7</p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-4">Яка твоя основна ціль?</p>

            {goalOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  updateField("goal", item);
                  if (item !== "Здоров’я / без болю") {
                    updateField("currentHealthIssues", []);
                  }
                  next();
                }}
                className="w-full border border-white/20 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* STEP 2: only for health goal */}
        {step === 2 && form.goal === "Здоров’я / без болю" && (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-4">
              Які проблеми зі здоров’ям є зараз?
            </p>

            <div className="space-y-3">
              {currentHealthIssueOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleArrayValue("currentHealthIssues", item)}
                  className={`w-full border py-4 rounded-xl transition ${
                    form.currentHealthIssues.includes(item)
                      ? "border-white bg-white text-black"
                      : "border-white/20 hover:bg-white hover:text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={back}
                className="w-full border border-white/20 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                Назад
              </button>
              <button
                onClick={next}
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Далі
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 or 3: level */}
        {((step === 2 && form.goal !== "Здоров’я / без болю") ||
          (step === 3 && form.goal === "Здоров’я / без болю")) && (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-4">Який твій рівень підготовки?</p>

            {levelOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  updateField("level", item);

                  if (item !== "Досвідчений") {
                    updateField("previousActivity", "");
                    updateField("experienceDuration", "");
                  }

                  next();
                }}
                className="w-full border border-white/20 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}

            <button
              onClick={back}
              className="w-full border border-white/20 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Назад
            </button>
          </div>
        )}

        {/* STEP 3 or 4: previous activity for experienced */}
        {((step === 3 && form.goal !== "Здоров’я / без болю" && form.level === "Досвідчений") ||
          (step === 4 && form.goal === "Здоров’я / без болю" && form.level === "Досвідчений")) && (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-4">
              Яким видом фізичної активності ти займався раніше?
            </p>

            {previousActivityOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  updateField("previousActivity", item);
                  next();
                }}
                className="w-full border border-white/20 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}

            <button
              onClick={back}
              className="w-full border border-white/20 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Назад
            </button>
          </div>
        )}

        {/* STEP 4 or 5: experience duration for experienced */}
        {((step === 4 && form.goal !== "Здоров’я / без болю" && form.level === "Досвідчений") ||
          (step === 5 && form.goal === "Здоров’я / без болю" && form.level === "Досвідчений")) && (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-4">
              Яка тривалість твого досвіду?
            </p>

            {experienceDurationOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  updateField("experienceDuration", item);
                  next();
                }}
                className="w-full border border-white/20 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}

            <button
              onClick={back}
              className="w-full border border-white/20 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Назад
            </button>
          </div>
        )}

        {/* STEP pain */}
        {((step === 3 && form.goal !== "Здоров’я / без болю" && form.level !== "Досвідчений") ||
          (step === 4 && form.goal === "Здоров’я / без болю" && form.level !== "Досвідчений") ||
          (step === 5 && form.goal !== "Здоров’я / без болю" && form.level === "Досвідчений") ||
          (step === 6 && form.goal === "Здоров’я / без болю" && form.level === "Досвідчений")) && (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-4">
              Чи є біль або травми?
            </p>

            {painOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  updateField("pain", item);

                  if (item !== "Є серйозні") {
                    updateField("seriousIssueType", "");
                    updateField("jointIssues", []);
                    updateField("otherSeriousIssues", []);
                  }

                  next();
                }}
                className="w-full border border-white/20 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}

            <button
              onClick={back}
              className="w-full border border-white/20 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Назад
            </button>
          </div>
        )}

        {/* STEP serious issue type */}
        {((step === 4 && form.goal !== "Здоров’я / без болю" && form.level !== "Досвідчений" && form.pain === "Є серйозні") ||
          (step === 5 && form.goal === "Здоров’я / без болю" && form.level !== "Досвідчений" && form.pain === "Є серйозні") ||
          (step === 6 && form.goal !== "Здоров’я / без болю" && form.level === "Досвідчений" && form.pain === "Є серйозні") ||
          (step === 7 && form.goal === "Здоров’я / без болю" && form.level === "Досвідчений" && form.pain === "Є серйозні")) && (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-4">
              Що саме тебе турбує?
            </p>

            {seriousIssueTypeOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  updateField("seriousIssueType", item);
                  if (item !== "Проблеми з суглобами") {
                    updateField("jointIssues", []);
                  }
                  if (item === "Проблеми з суглобами") {
                    updateField("otherSeriousIssues", []);
                  }
                  next();
                }}
                className="w-full border border-white/20 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}

            <button
              onClick={back}
              className="w-full border border-white/20 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Назад
            </button>
          </div>
        )}

        {/* STEP joints */}
        {form.seriousIssueType === "Проблеми з суглобами" && (
          ((step === 5 && form.goal !== "Здоров’я / без болю" && form.level !== "Досвідчений") ||
            (step === 6 && form.goal === "Здоров’я / без болю" && form.level !== "Досвідчений") ||
            (step === 7 && form.goal !== "Здоров’я / без болю" && form.level === "Досвідчений"))
        ) && (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-4">
              Які саме суглоби турбують?
            </p>

            <div className="space-y-3">
              {jointIssueOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleArrayValue("jointIssues", item)}
                  className={`w-full border py-4 rounded-xl transition ${
                    form.jointIssues.includes(item)
                      ? "border-white bg-white text-black"
                      : "border-white/20 hover:bg-white hover:text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={back}
                className="w-full border border-white/20 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                Назад
              </button>
              <button
                onClick={next}
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Далі
              </button>
            </div>
          </div>
        )}

        {/* STEP other serious issues details */}
        {form.seriousIssueType !== "" && form.seriousIssueType !== "Проблеми з суглобами" && (
          ((step === 5 && form.goal !== "Здоров’я / без болю" && form.level !== "Досвідчений") ||
            (step === 6 && form.goal === "Здоров’я / без болю" && form.level !== "Досвідчений") ||
            (step === 7 && form.goal !== "Здоров’я / без болю" && form.level === "Досвідчений"))
        ) && (
          <div className="space-y-4">
            <p className="text-center text-gray-300 mb-4">
              Уточни, що саме є зараз
            </p>

            <div className="space-y-3">
              {otherSeriousIssueOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleArrayValue("otherSeriousIssues", item)}
                  className={`w-full border py-4 rounded-xl transition ${
                    form.otherSeriousIssues.includes(item)
                      ? "border-white bg-white text-black"
                      : "border-white/20 hover:bg-white hover:text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={back}
                className="w-full border border-white/20 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                Назад
              </button>
              <button
                onClick={next}
                className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Далі
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {(
          (form.pain !== "Є серйозні" &&
            ((step === 4 && form.goal !== "Здоров’я / без болю" && form.level !== "Досвідчений") ||
              (step === 5 && form.goal === "Здоров’я / без болю" && form.level !== "Досвідчений") ||
              (step === 6 && form.goal !== "Здоров’я / без болю" && form.level === "Досвідчений") ||
              (step === 7 && form.goal === "Здоров’я / без болю" && form.level === "Досвідчений"))) ||
          (form.pain === "Є серйозні" && form.seriousIssueType === "Проблеми з суглобами" &&
            ((step === 6 && form.goal !== "Здоров’я / без болю" && form.level !== "Досвідчений") ||
              (step === 7 && form.goal === "Здоров’я / без болю" && form.level !== "Досвідчений"))) ||
          (form.pain === "Є серйозні" && form.seriousIssueType !== "Проблеми з суглобами" &&
            ((step === 6 && form.goal !== "Здоров’я / без болю" && form.level !== "Досвідчений") ||
              (step === 7 && form.goal === "Здоров’я / без болю" && form.level !== "Досвідчений")))
        ) && (
          <div className="text-center space-y-6">
            <p className="text-gray-300">
              На основі відповідей я підберу для тебе оптимальну стратегію, а не дам чергову випадкову пораду.
            </p>

            <a
              href={`https://wa.me/380994470977?text=${summaryText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white text-black py-4 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Отримати рекомендацію у WhatsApp
            </a>
          </div>
        )}
      </section>
    </main>
  );
}