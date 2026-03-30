export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.18),_transparent_35%),radial-gradient(circle_at_right,_rgba(255,255,255,0.08),_transparent_25%),linear-gradient(to_bottom,_#050505,_#0a0a0a_45%,_#050505)] text-white">
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
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

            <div className="flex space-x-4"> 
              <a
                href="https://www.instagram.com/burdak_coach?igsh=OGlhZ3J0bGpodXM2"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-4 rounded-2xl font-semibold text-center hover:bg-white hover:text-black transition"
              >
                Перейти в Instagram
              </a>
            </div>
            <a
  href="#results"
  className="mt-6 block group"
>
  <div className="relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition">
    
    <div className="group border border-white/10 rounded-2xl overflow-hidden relative hover:border-white/30 transition">

  <div className="grid grid-cols-3 h-60">
    <img src="/result1.jpg" className="w-full h-full object-cover" />
    <img src="/result2.jpg" className="w-full h-full object-cover" />
    <img src="/result3.jpg" className="w-full h-full object-cover" />
  </div>

  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

  <div className="absolute bottom-4 left-4">
    <p className="text-sm font-semibold">
      результат за 21 день
    </p>
    <p className="text-xs text-gray-300">
      різні ракурси • реальний кейс
    </p>
  </div>

</div>

    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

    <div className="absolute bottom-4 left-4">
      <p className="text-lg font-semibold">Результати</p>
      <p className="text-sm text-gray-300">кейси клієнтів</p>
    </div>
  </div>
  <section id="results" className="px-6 py-20 border-t border-white/10">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-12">
      Результати клієнтів
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="border border-white/10 rounded-2xl overflow-hidden">
        <img src="/result.jpg" className="w-full h-60 object-cover" />
        <div className="p-4">
          <p className="text-sm text-gray-400">
            -8 кг за 2 місяці
          </p>
        </div>
      </div>

      <div className="border border-white/10 rounded-2xl overflow-hidden">
        <img src="/result.jpg" className="w-full h-60 object-cover" />
        <div className="p-4">
          <p className="text-sm text-gray-400">
            +5 кг м’язів
          </p>
        </div>
      </div>

      <div className="border border-white/10 rounded-2xl overflow-hidden">
        <img src="/result.jpg" className="w-full h-60 object-cover" />
        <div className="p-4">
          <p className="text-sm text-gray-400">
            мінус біль у спині
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</a> 
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

              <p className="text-gray-400 mb-4">
                Аналіз твоєї ситуації, рекомендації по тренуваннях та харчуванню.
              </p>

              <p className="text-white font-semibold mb-6">
                від 500 грн
              </p>

              <a
                href="https://wa.me/380994470977?text=Привіт,%20хочу%20консультацію"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-white text-black py-3 rounded-xl font-semibold hover:opacity-80 transition"
              >
                Записатися
              </a>
            </div>

            <div className="border border-white/10 rounded-2xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-3">
                Програма тренувань
              </h3>

              <p className="text-gray-400 mb-4">
                Індивідуальний план тренувань під твою ціль та рівень.
              </p>

              <p className="text-white font-semibold mb-6">
                від 1000 грн
              </p>

              <a
                href="https://wa.me/380994470977?text=Привіт,%20хочу%20програму%20тренувань"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-white text-black py-3 rounded-xl font-semibold hover:opacity-80 transition"
              >
                Замовити
              </a>
            </div>

            <div className="border border-white/10 rounded-2xl p-6 hover:border-white/30 transition">
              <h3 className="text-xl font-semibold mb-3">
                Онлайн ведення
              </h3>

              <p className="text-gray-400 mb-4">
                Повний супровід: тренування, харчування, контроль і корекції.
              </p>

              <p className="text-white font-semibold mb-6">
                індивідуально
              </p>

              <a
                href="https://wa.me/380994470977?text=Привіт,%20цікавить%20онлайн%20ведення"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center border border-white py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
              >
                Написати
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}