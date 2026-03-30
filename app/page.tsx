export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-20">

      {/* HERO */}
      <section className="max-w-6xl mx-auto mb-20">
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
          Реабілітолог • Тренер • 5+ років досвіду
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Іван Бурдак
        </h1>

        <p className="text-gray-300 max-w-xl mb-6">
          Персональний тренер та реабілітолог. Допомагаю досягти результату через систему, а не випадкові тренування.
        </p>

        <blockquote className="border-l-4 border-white pl-4 italic text-gray-400 mb-10">
          “Зі мною результат залежить тільки від твоєї готовності працювати.”
        </blockquote>

        <a
          href="https://www.instagram.com/burdak_coach"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
        >
          Перейти в Instagram
        </a>
      </section>

      {/* РЕЗУЛЬТАТИ (КНОПКА) */}
      <section className="max-w-6xl mx-auto mb-20">
        <a href="/results" className="block group">

          <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition">

            <img
              src="/result1.jpg"
              className="w-full h-60 object-cover group-hover:scale-105 transition"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-4 left-4">
              <p className="text-xl font-semibold">
                Результати
              </p>
              <p className="text-sm text-gray-300">
                кейси клієнтів
              </p>
            </div>

          </div>

        </a>
      </section>

      {/* ПОСЛУГИ */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">
          Послуги
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 1 */}
          <div className="border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Онлайн консультація
            </h3>

            <p className="text-gray-400 mb-4">
              Аналіз ситуації, рекомендації по тренуваннях та харчуванню.
            </p>

            <p className="mb-6 font-semibold">
              від 500 грн
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20хочу%20консультацію"
              target="_blank"
              className="block text-center bg-white text-black py-3 rounded-xl font-semibold"
            >
              Записатися
            </a>
          </div>

          {/* 2 */}
          <div className="border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Програма тренувань
            </h3>

            <p className="text-gray-400 mb-4">
              Індивідуальний план під твою ціль та рівень.
            </p>

            <p className="mb-6 font-semibold">
              від 1000 грн
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20хочу%20програму"
              target="_blank"
              className="block text-center bg-white text-black py-3 rounded-xl font-semibold"
            >
              Замовити
            </a>
          </div>

          {/* 3 */}
          <div className="border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Онлайн ведення
            </h3>

            <p className="text-gray-400 mb-4">
              Повний супровід: тренування, харчування, контроль.
            </p>

            <p className="mb-6 font-semibold">
              індивідуально
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20хочу%20супровід"
              target="_blank"
              className="block text-center border border-white py-3 rounded-xl font-semibold"
            >
              Написати
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}