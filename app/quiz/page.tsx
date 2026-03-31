"use client";

import { useState } from "react";

export default function Quiz() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    goal: "",
    level: "",
    pain: "",
  });

  const next = () => setStep(step + 1);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <section className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold mb-10 text-center">
          Оцінка фізичної форми
        </h1>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-gray-300 text-center">
              Яка твоя основна ціль?
            </p>

            {["Схуднення", "Набір м’язів", "Здоров’я / без болю"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  handleChange("goal", item);
                  next();
                }}
                className="w-full border border-white/20 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <p className="text-gray-300 text-center">
              Який твій рівень?
            </p>

            {["Новачок", "Середній", "Досвідчений"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  handleChange("level", item);
                  next();
                }}
                className="w-full border border-white/20 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <p className="text-gray-300 text-center">
              Чи є біль або травми?
            </p>

            {["Немає", "Є незначні", "Є серйозні"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  handleChange("pain", item);
                  next();
                }}
                className="w-full border border-white/20 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* RESULT */}
        {step === 4 && (
          <div className="text-center space-y-6">
            <p className="text-gray-300">
              На основі відповідей я підберу для тебе оптимальну стратегію.
            </p>

            <a
              href={`https://wa.me/380994470977?text=Привіт,%20я%20пройшов%20тест.%20Ціль:%20${form.goal},%20Рівень:%20${form.level},%20Біль:%20${form.pain}`}
              target="_blank"
              className="block bg-white text-black py-4 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Отримати план у WhatsApp
            </a>
          </div>
        )}
      </section>
    </main>
  );
}