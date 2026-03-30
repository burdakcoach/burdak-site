export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-20">

      {/* HERO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-24">

        {/* ТЕКСТ */}
        <div>
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            5+ років досвіду • онлайн робота
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Іван Бурдак
          </h1>

          <p className="text-gray-300 mb-6 max-w-md">
            Допомагаю прибрати біль, привести тіло в форму та отримати результат через системний підхід.
          </p>

          <blockquote className="border-l-4 border-white pl-4 italic text-gray-400 mb-8">
            “Результат залежить від твоєї готовності працювати.”
          </blockquote>

          <a
            href="https://www.instagram.com/burdak_coach"
            target="_blank"
            className="inline-block border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Перейти в Instagram
          </a>
        </div>

        {/* ФОТО */}
        <div className="flex justify-center">
          <img
            src="/me.jpg"
            className="rounded-2xl w-[350px] object-cover"
          />
        </div>

      </section>

      {/* РЕЗУЛЬТАТИ */}
      <section className="max-w-6xl mx-auto mb-20">
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
      {/* ПОСЛУГИ */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">
          Послуги
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

          <div className="border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Програма тренувань
            </h3>

            <p className="text-gray-400 mb-4">
              Індивідуальний план під твою ціль.
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

    
