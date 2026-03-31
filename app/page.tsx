export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_25%),linear-gradient(to_bottom,_#030303,_#080808_45%,_#030303)] text-white px-6 py-20">
      {/* HERO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center mb-28">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-gray-500 mb-5">
            5+ років досвіду • онлайн робота
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Іван Бурдак
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-6">
            Допомагаю прибрати біль, привести тіло в форму та отримати результат
            через системний підхід.
          </p>

          <blockquote className="border-l-4 border-white/80 pl-4 italic text-gray-400 text-base md:text-lg mb-8">
            “Результат залежить від твоєї готовності працювати.”
          </blockquote>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.instagram.com/burdak_coach"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
            >
              Перейти в Instagram
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 rounded-[28px] bg-white/5 blur-2xl scale-95" />
            <img
              src="/me.jpg"
              alt="Іван Бурдак"
              className="relative w-[320px] md:w-[380px] rounded-[28px] object-cover border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* RESULTS CARD */}
      <section className="max-w-6xl mx-auto mb-24">
        <a href="/results" className="block group max-w-2xl">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition">
            <img
              src="/result.jpg"
              alt="Результат за 21 день"
              className="w-full h-32 md:h-36 object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition" />

            <div className="absolute bottom-4 left-4">
              <p className="text-base md:text-lg font-semibold">
                Результат за 21 день
              </p>
              <p className="text-xs text-gray-300">
                кейс клієнта
              </p>
            </div>
          </div>
        </a>
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Послуги
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition">
            <h3 className="text-xl font-semibold mb-3">
              Онлайн консультація
            </h3>

            <p className="text-gray-400 mb-4 leading-relaxed">
              Аналіз ситуації, рекомендації по тренуваннях та харчуванню.
            </p>

            <p className="mb-6 font-semibold text-white">
              від 500 грн
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20хочу%20консультацію"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Записатися
            </a>
          </div>

          <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition">
            <h3 className="text-xl font-semibold mb-3">
              Програма тренувань
            </h3>

            <p className="text-gray-400 mb-4 leading-relaxed">
              Індивідуальний план під твою ціль.
            </p>

            <p className="mb-6 font-semibold text-white">
              від 1000 грн
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20хочу%20програму%20тренувань"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Замовити
            </a>
          </div>

          <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:border-white/30 transition">
            <h3 className="text-xl font-semibold mb-3">
              Онлайн ведення
            </h3>

            <p className="text-gray-400 mb-4 leading-relaxed">
              Повний супровід: тренування, харчування, контроль.
            </p>

            <p className="mb-6 font-semibold text-white">
              індивідуально
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20цікавить%20онлайн%20ведення"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center border border-white py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
            >
              Написати
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}