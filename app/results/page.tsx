export default function Results() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_20%),linear-gradient(to_bottom,_#030303,_#080808_45%,_#030303)] text-white px-6 py-20">
      <section className="max-w-6xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center border border-white/15 bg-white/5 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:bg-white hover:text-black transition mb-8"
        >
          ← Назад на головну
        </a>

        <div className="max-w-3xl mb-12">
          <p className="text-sm uppercase tracking-[0.28em] text-gray-500 mb-4">
            Кейси клієнтів
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Результат за 21 день
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
            Один кейс. Один клієнт. Три ракурси. Помітна зміна форми тіла всього за 3 тижні
            системної роботи.
          </p>

          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            реальний кейс • 21 день
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src="/result1.jpg"
              alt="Результат клієнта, ракурс 1"
              className="w-full h-[420px] object-cover group-hover:scale-[1.02] transition duration-300"
            />
          </div>

          <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src="/result2.jpg"
              alt="Результат клієнта, ракурс 2"
              className="w-full h-[420px] object-cover group-hover:scale-[1.02] transition duration-300"
            />
          </div>

          <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src="/result3.jpg"
              alt="Результат клієнта, ракурс 3"
              className="w-full h-[420px] object-cover group-hover:scale-[1.02] transition duration-300"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
          <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Що тут важливо
            </h2>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Це не “випадковий хороший день”, а результат системного підходу:
                контроль навантаження, харчування та дисципліни.
              </p>

              <p>
                Коли людина працює по плану, зміни видно не в теорії, а в дзеркалі.
                Саме тому я будую роботу не навколо хаотичних порад, а навколо
                структури і контролю.
              </p>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Хочеш свій результат?
            </h3>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Якщо тобі потрібен не “мотиваційний текст”, а реальний план і контроль,
              пиши в WhatsApp.
            </p>

            <a
              href="https://wa.me/380994470977?text=Привіт,%20хочу%20отримати%20такий%20же%20результат"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Написати в WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}