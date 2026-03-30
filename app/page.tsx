export default function Home() {
  return (
    <main className="bg-black text-white">
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
              Реабілітолог • Тренер • 5+ років досвіду
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Іван Бурдак
            </h1>

            <div className="mb-8 space-y-4">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Персональний тренер та реабілітолог.
              </p>

              <blockquote className="border-l-4 border-white pl-4 italic text-lg md:text-xl text-gray-400">
                “Зі мною результат залежить тільки від твоєї готовності пожертвувати гіршою версією себе.”
              </blockquote>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/380994470977"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-4 rounded-2xl font-semibold text-center hover:opacity-80 transition"
              >
                Записатися на консультацію
              </a>

              <a
                href="https://www.instagram.com/burdak_coach?igsh=OGlhZ3J0bGpodXM2"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white px-6 py-4 rounded-2xl font-semibold text-center hover:bg-white hover:text-black transition"
              >
                Перейти в Instagram
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-white/10 rounded-2xl p-4">
                <p className="text-2xl font-bold">5+ років</p>
                <p className="text-gray-400 text-sm mt-1">практичного досвіду</p>
              </div>
              <div className="border border-white/10 rounded-2xl p-4">
                <p className="text-2xl font-bold">UA / EN</p>
                <p className="text-gray-400 text-sm mt-1">масштабування в майбутньому</p>
              </div>
              <div className="border border-white/10 rounded-2xl p-4">
                <p className="text-2xl font-bold">Online</p>
                <p className="text-gray-400 text-sm mt-1">супровід і консультації</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10">
              <img
                src="/me.jpg"
                alt="Іван Бурдак"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Послуги
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-white/10 rounded-2xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-3">
                Онлайн консультація
              </h3>
              <p className="text-gray-400 mb-6">
                Аналіз твоєї ситуації, рекомендації по тренуваннях та харчуванню.
              </p>
              <a
                href="https://wa.me/380994470977"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline"
              >
                Записатися
              </a>
            </div>

            <div className="border border-white/10 rounded-2xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-3">
                Програма тренувань
              </h3>
              <p className="text-gray-400 mb-6">
                Індивідуальний план тренувань під твою ціль та рівень.
              </p>
              <a
                href="https://wa.me/380994470977"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline"
              >
                Замовити
              </a>
            </div>

            <div className="border border-white/10 rounded-2xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-3">
                Онлайн ведення
              </h3>
              <p className="text-gray-400 mb-6">
                Повний супровід: тренування, харчування, контроль і корекції.
              </p>
              <a
                href="https://wa.me/380994470977"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline"
              >
                Детальніше
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}